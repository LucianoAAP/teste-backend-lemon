const sinon = require('sinon');
const { expect } = require('chai');
const { OK } = require('http-status-codes');
const eligibleClientReport = require('../../data/eligibleOutput.json');
const EligibilityService = require('../../../services/EligibilityService');
const { createEligibilityReport } = require('../../../controllers/EligibilityController');

describe('Testa controller de eligibilidade', () => {
  before(async () => {
    const expectedReport = JSON.parse(JSON.stringify(eligibleClientReport));
    sinon.stub(EligibilityService, 'createEligibilityReport').returns(expectedReport);
  });

  after(() => {
    EligibilityService.createEligibilityReport.restore();
  });

  describe('Testa com o json correto', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it('Testa status e json', () => {
      const expectedReport = JSON.parse(JSON.stringify(eligibleClientReport));
      createEligibilityReport(request, response);
      expect(response.status.calledWith(OK)).to.be.equal(true);
      expect(response.json.calledWith(expectedReport)).to.be.equal(true);
    });
  });
});
