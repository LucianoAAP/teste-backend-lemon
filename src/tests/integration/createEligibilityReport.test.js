const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { OK, BAD_REQUEST } = require('http-status-codes');
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

  describe('Testa com propriedades faltando na requisição', () => {
    const keys = Object.keys(eligibleClient);

    keys.forEach((key) => {
      describe(`Testa sem a propriedade ${key} na requisição`, () => {
        const client = {};
        keys.filter((property) => property !== key).forEach((property) => {
          client[property] = eligibleClient[property];
        });

        const expectedMessage = `\"${key}\" is required`;

        let response = {};

        before(async () => {
          if (!console.log.restore) sinon.stub(console, "log");
          response = await chai.request(server).post('/eligibility').send(client);
        });

        it('A resposta possui o status correto', () => {
          expect(response).to.have.status(BAD_REQUEST);
        });

        it('Retorna a mensagem de erro correta', () => {
          expect(response.body).to.be.deep.equal(expectedMessage);
        });
      });
    });
  });

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
