const authUtil = {
	successTrue: (status, message, data) => {
		return {
			status: status,
			success: true,
			message: message,
			data: data,
		};
	},
	successFalse: (status, message, data) => {
		return {
			status: status,
			success: false,
			message: message,
			data: data,
		};
	},
	jwtSent: (status, message, accessToken, refreshToken) => {
		return {
			status: status,
			success: true,
			message: message,
			accessToken: accessToken,
			refreshToken: refreshToken,
		};
	},
	unknownError: data => {
		return {
			status: 501,
			success: false,
			message: '알수 없는 에러가 발생하였습니다. Console을 확인해주세요',
			data: data,
		};
	},
};

module.exports = authUtil;
