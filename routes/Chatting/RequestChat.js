const axios = require('axios');

const RequestChat = async (req, res) => {
	const message = req.body;
	axios
		.post(
			'https://api.openai.com/v1/chat/completions',
			{
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'user',
						content: [
							{
								type: 'text',
								text: 'API 테스트',
							},
						],
					},
					{
						role: 'assistant',
						content: [
							{
								type: 'text',
								text:
									'API 테스트는 소프트웨어 개발 과정 중에 API(Application Programming Interface)를 테스트하는 것을 말합니다. API는 소프트웨어 간의 통신을 위한 인터페이스로, 다른 시스템과의 상호작용을 위해 사용됩니다.\n\nAPI 테스트는 API의 정확성, 안정성, 성능 및 보안을 확인하기 위해 수행됩니다. 이를 통해 API가 의도대로 작동하는지 확인하고, 잠재적인 버그나 문제를 발견하여 수정할 수 있습니다.\n\nAPI 테스트는 여러 방법으로 수행될 수 있습니다. 이를 테스트할 수 있는 도구나 프레임워크를 사용하여 자동화된 테스트를 수행할 수도 있고, 수동으로 API를 호출하고 응답을 확인하는 방식으로 테스트할 수도 있습니다.\n\nAPI 테스트의 목적은 개',
							},
						],
					},
					{
						role: 'user',
						content: [
							{
								type: 'text',
								text: message,
							},
						],
					},
				],
				temperature: 1,
				max_tokens: 256,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			},
			{
				Authorization: process.env.GPT_ACCESSTOKEN,
				'Content-Type': 'application/json',
			}
		)
		.then(data => {
			res.json(data);
		});
};

module.exports = RequestChat;
