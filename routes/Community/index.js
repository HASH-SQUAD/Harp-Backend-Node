const express = require('express');
const router = express.Router();

const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const createPost = require('./CreatePost.js');
router.post('/', validateToken, createPost);


module.exports = router;