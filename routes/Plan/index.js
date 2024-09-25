const express = require('express');
const router = express.Router();

const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const CreatePlan = require('./CreatePlan.js');
router.post('/', validateToken, CreatePlan);

const GetPlanAll = require('./GetPlanAll.js')
router.get('/', validateToken, GetPlanAll)

const UpdatePlanAll = require('./UpdatePlan.js')
router.put('/putplan/:id', validateToken, UpdatePlanAll)

const DeletePlan = require('./DeletePlan.js')
router.delete('/deleteplan/:id', validateToken, DeletePlan)

const GetPlanOne = require('./GetPlanOne.js')
router.get('/getplan/:id', validateToken, GetPlanOne)

const CreateRecommendPlan = require('./CreateRecommendPlan.js')
router.post('/recommend', validateToken, CreateRecommendPlan)

const GetRecommendPlan = require('./GetRecommendPlan.js')
router.get('/getrecommend', validateToken, GetRecommendPlan)

module.exports = router;
