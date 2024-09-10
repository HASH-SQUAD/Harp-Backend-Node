const express = require('express');
const router = express.Router();

const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const requestChat = require('../Chatting/TravelChat.js');
router.post('/request/:id', validateToken, requestChat);

const createAI = require('../Chatting/AI.js');
router.post('/createai', validateToken, createAI);

module.exports = router;