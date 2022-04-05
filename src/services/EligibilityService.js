const EligibilityModel = require('../models/EligibilityModel');

const createEligibilityReport = (client) => {
  const eligibilityReport = EligibilityModel.createEligibilityReport(client);
  return eligibilityReport;
};

module.exports = { createEligibilityReport };
