const MainRoutes = require('express').Router({ mergeParams: true });

const EligibilityRouter = require('./EligibilityRouter');

MainRoutes.use('/eligibility', EligibilityRouter);

module.exports = MainRoutes;
