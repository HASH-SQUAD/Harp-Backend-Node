const axios = require('axios');
const fs = require('fs');
const path = require('path');
const authUtil = require('../../response/authUtil.js');
const { AI } = require('../../models');

const conversationPath = path.join(__dirname, './system/TravelData.json');

const TravelChat = async (req, res) => {
	const { previousConversation, location } = req.body;
	const userId = req.user.dataValues.userId;
	const aiId = req.params.id;

	try {
		let aiRecord = await AI.findOne({ where: { aiId: aiId } });

		if (!aiRecord || aiRecord.dataValues.userId !== userId) {
			return res.status(403).send(authUtil.successFalse(403, '사용자 권한이 없습니다.'));
		}

		const Conversation = JSON.parse(fs.readFileSync(conversationPath, 'utf8'));

		let previousConversations = aiRecord.dataValues.conversation || { ...Conversation, messages: [] };

		const systemMessageExists = previousConversations.messages.some(
			message => message.role === 'system'
		);

		let location_Response = {};

		if (location) {
			const cafeResponse = await axios({
				method: 'GET',
				url: `https://dapi.kakao.com/v2/local/search/keyword?query=${location}&page=1&size=10&category_group_code=FD6`,
				headers: {
					'Authorization': `KakaoAK ${process.env.KAKAO_CLIENT_ID}`
				}
			});
			const foodResponse = await axios({
				method: 'GET',
				url: `https://dapi.kakao.com/v2/local/search/keyword?query=${location}&page=1&size=10&category_group_code=CE7`,
				headers: {
					'Authorization': `KakaoAK ${process.env.KAKAO_CLIENT_ID}`
				}
			});

			location_Response = {
				cafe: cafeResponse.data,
				food: foodResponse.data
			};
		}

		const systemMessageIndex = previousConversations.messages.findIndex(
			message => message.role === 'system'
		);

		if (systemMessageIndex !== -1) {
			const systemMessage = previousConversations.messages[systemMessageIndex];

			const updatedContent = `
        카페&음식점 정보: ${JSON.stringify(location_Response)}
        ${systemMessage.content}
      `;

			previousConversations.messages[systemMessageIndex].content = updatedContent;
		} else {
			previousConversations.messages.unshift({
				role: 'system',
				content: `
          카페&음식점 정보: ${JSON.stringify(location_Response)}
          시스템 데이터: ${JSON.stringify(Conversation, null, 2)}
        `
			});
		}

		previousConversations.messages.push({
			role: 'user',
			content: previousConversation
		});

		const response = await axios({
			method: 'POST',
			url: 'https://api.openai.com/v1/chat/completions',
			headers: {
				'Authorization': `Bearer ${process.env.GPT_SECRET_KEY}`,
				'Content-Type': 'application/json'
			},
			data: {
				model: 'gpt-3.5-turbo-16k',
				messages: previousConversations.messages,
				max_tokens: 8000,
				temperature: 0.40,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0
			}
		});

		const responseContent = response.data.choices[0].message.content;

		let contents;

		try {
			contents = JSON.parse(responseContent);
		} catch (e) {
			contents = responseContent;
		}

		previousConversations.messages.push({
			role: 'assistant',
			content: typeof contents === 'string' ? contents : JSON.stringify(contents, null, 2)
		});

		await AI.update({ conversation: previousConversations }, { where: { aiId: aiId } });

		if (typeof contents === 'object') {
			res.status(200).json(authUtil.successTrue(200, '성공', { "role": response.data.choices[0].message.role, Contents: contents }));
		} else {
			res.status(200).json(authUtil.successTrue(200, '성공', { "role": response.data.choices[0].message.role, Contents: contents }));
		}

	} catch (error) {
		console.error('RequestChat 에러:', error);

		if (error.response) {
			return res.status(error.response.status).send(authUtil.successFalse(error.response.status, error.response.data.error.message));
		} else if (error.request) {
			return res.status(500).send(authUtil.successFalse(500, 'GPT로부터 응답을 받지 못했습니다.'));
		} else {
			return res.status(500).send(authUtil.successFalse(500, '요청 설정 중 오류가 발생했습니다.'));
		}
	}
};

module.exports = TravelChat;
