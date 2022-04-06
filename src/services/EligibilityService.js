const EligibilityModel = require('../models/EligibilityModel');
const { badRequest } = require('../error/apiError');
const validateClient = require('../validations/ValidateClient');

const createEligibilityReport = (client) => {
  const error = validateClient(client);
  if (error) return badRequest(error);

  const eligibilityReport = EligibilityModel.createEligibilityReport(client);
  return eligibilityReport;
};

module.exports = { createEligibilityReport };
