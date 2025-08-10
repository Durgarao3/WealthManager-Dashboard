const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/portfolioController');

router.get('/holdings', ctrl.getHoldings);
router.get('/allocation', ctrl.getAllocation);
router.get('/performance', ctrl.getPerformance);
router.get('/summary', ctrl.getSummary);

module.exports = router;
