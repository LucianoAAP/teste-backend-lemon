const { expect } = require('chai');
const eligibleClient = require('../../mocks/eligible');
const notEligibleClient = require('../../mocks/notEligible');
const eligibleClientReport = require('../../data/eligibleOutput.json');
const notEligibleClientReport = require('../../data/notEligibleOutput.json');
const { createEligibilityReport } = require('../../../models/EligibilityModel');

describe('Testa função de eligibilidade', () => {
  it('Testa com cliente não elegível', () => {
    const expectedReport = JSON.parse(JSON.stringify(notEligibleClientReport));
    const report = createEligibilityReport(notEligibleClient);
    expect(report).to.be.deep.equal(expectedReport);
  });

  it('Testa com cliente elegível', () => {
    const expectedReport = JSON.parse(JSON.stringify(eligibleClientReport));
    const report = createEligibilityReport(eligibleClient);
    expect(report).to.be.deep.equal(expectedReport);
  });
});
