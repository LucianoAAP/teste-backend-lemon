const { expect } = require('chai');
const eligibleClient = require('../mocks/eligible');
const notEligibleClient = require('../mocks/notEligible');
const eligibleClientReport = require('../data/eligibleOutput.json');
const notEligibleClientReport = require('../data/notEligibleOutput.json');
const getEligibility = require('../../getEligibility');

describe('Testa função de eligibilidade', () => {
  it('Testa com cliente não elegível', () => {
    const expectedReport = JSON.parse(JSON.stringify(notEligibleClientReport));
    const report = getEligibility(notEligibleClient);
    expect(report).to.be.deep.equal(expectedReport);
  });

  it('Testa com cliente elegível', () => {
    const expectedReport = JSON.parse(JSON.stringify(eligibleClientReport));
    const report = getEligibility(eligibleClient);
    expect(report).to.be.deep.equal(expectedReport);
  });
});
