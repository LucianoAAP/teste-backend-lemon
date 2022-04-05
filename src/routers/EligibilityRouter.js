const rescue = require('express-rescue');
const EligibilityRouter = require('express').Router({ mergeParams: true });
const { createEligibilityReport } = require('../controllers/EligibilityController');

EligibilityRouter.post('/', rescue(createEligibilityReport));

module.exports = EligibilityRouter;
