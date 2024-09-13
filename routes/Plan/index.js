const express = require('express');
const router = express.Router();

const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const CreatePlan = require('./CreatePlan.js');
router.post('/', validateToken, CreatePlan);

const GetPlan = require('./GetPlanAll.js')
router.get('/', validateToken, GetPlan)

module.exports = router;