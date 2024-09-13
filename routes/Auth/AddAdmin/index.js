const express = require('express');
const router = express.Router();

const { validateToken } = require('../../../middlewares/AuthMiddleware.js');

const AddAdmin = require('./AddAdmin.js');
router.post('/', validateToken, AddAdmin);

module.exports = router;
