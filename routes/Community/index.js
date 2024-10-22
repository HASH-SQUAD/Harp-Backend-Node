const express = require('express');
const router = express.Router();

const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const createPost = require('./CreatePost.js');
router.post('/', validateToken, createPost);

const GetAllPost = require('./GetAllPost.js')
router.get('/', GetAllPost)

const AddWish = require('./AddWish.js');
router.post('/wish/add/:id', validateToken, AddWish);


module.exports = router;