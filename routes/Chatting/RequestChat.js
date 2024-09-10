const axios = require('axios');
const systemData = require('./system/system.js');
const fs = require('fs');
const path = require('path');
const authUtil = require('../../response/authUtil.js');
const { AI } = require('../../models');

const conversationPath = path.join(__dirname, './system/conversation.json');

const RequestChat = async (req, res) => {
	const { previousConversation, location } = req.body;
	const userId = req.user.dataValues.userId;
	const aiId = req.params.id;

	try {
		const aiRecord = await AI.findOne({ where: { aiId: aiId } });

		if (!aiRecord || aiRecord.dataValues.userId !== userId) {
			return res.status(403).send(authUtil.successFalse(403, '사용자 권한이 없습니다.'));
		}
		
		const previousConversations = JSON.parse(fs.readFileSync(conversationPath, 'utf8'));

		const systemMessageExists = previousConversations.messages.some(
			message => message.role === 'system'
		);

		if (!systemMessageExists) {
			previousConversations.messages.unshift({
				role: 'system',
				content: [
					{
						type: 'text',
						text: systemData
					}
				]
			});
		}

		previousConversations.messages.push({
			role: 'user',
			content: [
				{
					type: 'text',
					text: previousConversation
				}
			]
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
				temperature: 1.33,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0
			}
		});

		const contents = response.data.choices[0].message.content;

		previousConversations.messages.push(
			{
				"role": "assistant",
				"content": [
					{
						"type": "text",
						"text": contents
					}
				]
			}
		);

		// 대화 내용을 데이터베이스에 업데이트
		await AI.update({ conversation: previousConversations }, { where: { aiId: aiId } });

		res.status(200).send(authUtil.successTrue(200, '성공', { Contents: contents }));

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

module.exports = RequestChat;