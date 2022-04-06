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

  describe('Testa com identificação inválida', () => {
    describe('Identificação fora do padrão', () => {
      const client = { ...eligibleClient, numeroDoDocumento: '' };
      const expectedMessage = '\"numeroDoDocumento\" does not match any of the allowed types';

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

    describe('Identificação no formato errado', () => {
      const client = { ...eligibleClient, numeroDoDocumento: 14041737706 };
      const expectedMessage = '\"numeroDoDocumento\" must be one of [string]';

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

  describe('Testa com tipo de conexão inválida', () => {
    const client = { ...eligibleClient, tipoDeConexao: '' };
    const expectedMessage = '\"tipoDeConexao\" must be one of [monofasico, bifasico, trifasico]';

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

  describe('Testa com classe de consumo inválida', () => {
    const client = { ...eligibleClient, classeDeConsumo: '' };
    const validValues = '[residencial, industrial, comercial, rural, poderPublico]';
    const expectedMessage = `\"classeDeConsumo\" must be one of ${validValues}`;

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

  describe('Testa com modalidade tarifária inválida', () => {
    const client = { ...eligibleClient, modalidadeTarifaria: '' };
    const validValues = '[azul, branca, verde, convencional]';
    const expectedMessage = `\"modalidadeTarifaria\" must be one of ${validValues}`;

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

  describe('Testa com histórico de consumo inváldo', () => {
    const cases = [
      { test: 'Histórico no formato errado', historicoDeConsumo: '',
        message: '\"historicoDeConsumo\" must be an array' },
      { test: 'Histórico muito pequeno',
        historicoDeConsumo: [], message: '\"historicoDeConsumo\" must contain at least 3 items' },
      { test: 'Histórico muito grande',
        historicoDeConsumo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        message: '\"historicoDeConsumo\" must contain less than or equal to 12 items' },
      { test: 'Item do histórico no formato errado',
        historicoDeConsumo: ['0', 0, 0], message: '\"historicoDeConsumo[0]\" must be a number' },
      { test: 'Consumo negativo', historicoDeConsumo: [-1, 0, 0],
        message: '\"historicoDeConsumo[0]\" must be greater than or equal to 0' },
      { test: 'Consumo alto demais', historicoDeConsumo: [10000, 0, 0],
        message: '\"historicoDeConsumo[0]\" must be less than or equal to 9999' },
    ];

    cases.forEach(({ test, historicoDeConsumo, message }) => {
      describe(test, () => {
        const client = { ...eligibleClient, historicoDeConsumo: historicoDeConsumo };
        let response = {};

        before(async () => {
          if (!console.log.restore) sinon.stub(console, "log");
          response = await chai.request(server).post('/eligibility').send(client);
        });

        it('A resposta possui o status correto', () => {
          expect(response).to.have.status(BAD_REQUEST);
        });

        it('Retorna a mensagem de erro correta', () => {
          expect(response.body).to.be.deep.equal(message);
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
