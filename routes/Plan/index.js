const express = require('express');
const router = express.Router();

const CreatePlan = require('./CreatePlan.js');
router.post('/', CreatePlan);

module.exports = router;
