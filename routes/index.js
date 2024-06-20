const express = require('express');
const router = express.Router();

const GoogleRouter = require('./GoogleAuth');
router.use('/auth', GoogleRouter);

const KakaoRouter = require('./KakaoAuth');
router.use('/auth', KakaoRouter);

const ChattingRouter = require('./Chatting');
router.use('/chat', ChattingRouter);

module.exports = router;
