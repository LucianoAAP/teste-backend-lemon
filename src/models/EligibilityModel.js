const getConsumption = (history) => {
  const totalConsumption = history.reduce((accumulator, current) => (
      accumulator + current
    ));

    const averageConsumption = totalConsumption / history.length;

    const economiaAnualDeCO2 = Number((totalConsumption * (84 / 1000)).toFixed(2));

    return { averageConsumption, economiaAnualDeCO2 };
};

const createEligibilityReport = (client) => {
  const { tipoDeConexao, classeDeConsumo, modalidadeTarifaria, historicoDeConsumo } = client;

  const eligibleConsumingClasses = ['comercial', 'residencial', 'industrial'];
  const eligibleTariffModes = ['convencional', 'cranca'];
  const minimumConsumption = { monofasico: 400, bifasico: 500, trifasico: 750 };
  const { averageConsumption, economiaAnualDeCO2 } = getConsumption(historicoDeConsumo);

  const razoesInelegibilidade = [];

  const consumingClassEligibility = eligibleConsumingClasses
    .some((consumingClass) => consumingClass === classeDeConsumo);
  const tariffModeEligibility = eligibleTariffModes.some((mode) => mode === modalidadeTarifaria);
  const consumptionEligibility = averageConsumption >= minimumConsumption[tipoDeConexao];

  if (!consumingClassEligibility) razoesInelegibilidade.push('Classe de consumo não aceita');
  if (!tariffModeEligibility) razoesInelegibilidade.push('Modalidade tarifária não aceita');
  if (!consumptionEligibility) {
    razoesInelegibilidade.push('Consumo muito baixo para tipo de conexão');
  }

  const elegivel = razoesInelegibilidade.length === 0;

  if (!elegivel) return { elegivel, razoesInelegibilidade };

  return { elegivel, economiaAnualDeCO2 };
};

module.exports = { createEligibilityReport };
