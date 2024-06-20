const express = require('express');
const router = express.Router();

const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const RequestChat = require('../Chatting/RequestChat.js');
router.post('/', validateToken, RequestChat);
