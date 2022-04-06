const joi = require('joi');

const stringNotEmptyRequired = joi.string().empty(false).required();

const schema = joi.object().keys({
  numeroDoDocumento: joi.alternatives().try(
    joi.string().empty(false).pattern(new RegExp('^\\d{11}$')),
    joi.string().empty(false).pattern(new RegExp('^\\d{14}$')),
  ).required(),
  tipoDeConexao: stringNotEmptyRequired.valid('monofasico', 'bifasico', 'trifasico'),
  classeDeConsumo: stringNotEmptyRequired.valid(
    'residencial',
    'industrial',
    'comercial',
    'rural',
    'poderPublico',
  ),
  modalidadeTarifaria: stringNotEmptyRequired.valid('azul', 'branca', 'verde', 'convencional'),
  historicoDeConsumo: joi.array().items(joi.number().min(0).max(9999).strict()).min(3).max(12)
    .required(),
});

module.exports = (client) => {
  const { error } = schema.validate(client);

  if (error) {
    return error.details[0].message;
  }
  
  return false;
};
