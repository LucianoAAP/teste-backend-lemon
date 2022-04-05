const sinon = require('sinon');
const { expect } = require('chai');
const eligibleClient = require('../../mocks/eligible');
const eligibleClientReport = require('../../data/eligibleOutput.json');
const EligibilityModel = require('../../../models/EligibilityModel');
const { createEligibilityReport } = require('../../../services/EligibilityService');

describe('Testa service de eligibilidade', () => {
  before(() => {
    const expectedReport = JSON.parse(JSON.stringify(eligibleClientReport));
    sinon.stub(EligibilityModel, 'createEligibilityReport').returns(expectedReport);
  });

  after(() => {
    EligibilityModel.createEligibilityReport.restore();
  });

  describe('Testa com o json correto', () => {
    it('Retorna o relatório correto', () => {
      const expectedReport = JSON.parse(JSON.stringify(eligibleClientReport));
      const report = createEligibilityReport(eligibleClient);
      expect(report).to.be.deep.equal(expectedReport);
    });
  });
});
