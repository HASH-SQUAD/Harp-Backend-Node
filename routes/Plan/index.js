const express = require('express');
const router = express.Router();

const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const CreatePlan = require('./CreatePlan.js');
router.post('/', validateToken, CreatePlan);

const GetPlanAll = require('./GetPlanAll.js')
router.get('/', validateToken, GetPlanAll)

const GetPlanOne = require('./GetPlanOne.js')
router.get('/:id', validateToken, GetPlanOne)

module.exports = router;
