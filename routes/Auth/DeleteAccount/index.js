const express = require('express');
const router = express.Router();

const { validateToken } = require('../../../middlewares/AuthMiddleware.js');

const DeleteAccount = require('./DeleteAccount.js');
router.delete('/', validateToken, DeleteAccount);

module.exports = router;
