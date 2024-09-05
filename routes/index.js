const express = require('express');
const router = express.Router();

// 간편로그인 라우터
const GoogleRouter = require('./GoogleAuth');
router.use('/auth', GoogleRouter);
const KakaoRouter = require('./KakaoAuth');
router.use('/auth', KakaoRouter);

// JWT 인증 라우터
const jwtRouter = require('./Jwt');
router.use('/jwt', jwtRouter);

// 새계정 생성 라우터
const NewAccountSignUpRouter = require('./NewAccountSignUp')
router.unsubscribe('/newaccount', NewAccountSignUpRouter)

// 채팅 라우터
const ChattingRouter = require('./Chatting');
router.use('/chat', ChattingRouter);

module.exports = router;
