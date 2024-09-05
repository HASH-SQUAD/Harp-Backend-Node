const axios = require('axios');
const systemData = require('./system/system.js');

const RequestChat = async (req, res) => {
	try {
		const message = req.body.message;
		const response = await axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'system',
						content: [
							{
								text: systemData,
								type: 'text',
							},
						],
					},
					{
						role: 'user',
						content: message,
					},
				],
				temperature: 1,
				max_tokens: 256,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.GPT_ACCESSTOKEN}`,
					'Content-Type': 'application/json',
				},
			}
		);

		res.send(response.data);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = RequestChat;
