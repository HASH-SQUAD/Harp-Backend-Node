const express = require('express');
const router = express.Router();

const userRouter = require('./GoogleAuth');
router.use('/auth', userRouter);

module.exports = router;
