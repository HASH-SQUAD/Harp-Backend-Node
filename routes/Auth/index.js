const express = require('express');
const router = express.Router();

// 간편로그인 라우터
const GoogleRouter = require('./GoogleAuth');
router.use('/google', GoogleRouter);
const KakaoRouter = require('./KakaoAuth');
router.use('/kakao', KakaoRouter);

// 새로운 유저생성
const NewAccountSignUpRouter = require('./NewAccountSignUp')
router.use('/newaccount', NewAccountSignUpRouter)

// 유저정보수정


// 설문조사 라우터
const SurveyRouter = require('./Survey');
router.use('/survey', SurveyRouter);



module.exports = router;