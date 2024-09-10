const express = require('express');
const router = express.Router();

const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const createAI = require('../Chatting/AI.js');
router.post('/createai', validateToken, createAI);

const TravelChat = require('../Chatting/TravelChat.js');
router.post('/travel/:id', validateToken, TravelChat);

const DateChat = require('../Chatting/DateChat.js');
router.post('/date/:id', validateToken, DateChat);

module.exports = router;