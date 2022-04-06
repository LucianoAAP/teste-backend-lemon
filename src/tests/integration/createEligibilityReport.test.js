const chai = require('chai');
const chaiHttp = require('chai-http');
const { OK } = require('http-status-codes');
const server = require('../../api/app');
const eligibleClient = require('../mocks/eligible');
const notEligibleClient = require('../mocks/notEligible');
const eligibleClientReport = require('../data/eligibleOutput.json');
const notEligibleClientReport = require('../data/notEligibleOutput.json');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota de criação de relatórios de eligibilidade', () => {
  const expectedNotEligible = JSON.parse(JSON.stringify(notEligibleClientReport));
  const expectedEligible = JSON.parse(JSON.stringify(eligibleClientReport));

  describe('Testa com uma pessoa não elegível', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server).post('/eligibility').send(notEligibleClient);
    });

    it('A resposta possui o status correto', () => {
      expect(response).to.have.status(OK);
    });

    it('Retorna o json correto', () => {
      expect(response.body).to.be.deep.equal(expectedNotEligible);
    });
  });

  describe('Testa com uma pessoa elegível', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server).post('/eligibility').send(eligibleClient);
    });

    it('A resposta possui o status correto', () => {
      expect(response).to.have.status(OK);
    });

    it('Retorna o json correto', () => {
      expect(response.body).to.be.deep.equal(expectedEligible);
    });
  });
});
