const { OK } = require('http-status-codes');
const EligibilityService = require('../services/EligibilityService');

const createEligibilityReport = (req, res) => {
  const client = req.body;
  const eligibilityReport = EligibilityService.createEligibilityReport(client);
  return res.status(OK).json(eligibilityReport);
};

module.exports = { createEligibilityReport };
