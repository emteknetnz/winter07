export const calculateProjection = (inputs) => {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    annualContribution,
    expectedReturn,
    taxRate
  } = inputs;

  const years = retirementAge - currentAge;
  const returnRate = expectedReturn / 100;
  const taxRateDecimal = taxRate / 100;

  const yearlyBreakdown = [];
  let balance = currentSavings;
  let totalContributions = 0;
  let totalEarnings = 0;
  let totalTaxes = 0;

  for (let i = 0; i < years; i++) {
    const year = currentAge + i + 1;
    const startingBalance = balance;
    
    const contributions = annualContribution;
    totalContributions += contributions;
    
    const balanceAfterContribution = startingBalance + contributions;
    
    const grossEarnings = balanceAfterContribution * returnRate;
    
    const taxes = grossEarnings * taxRateDecimal;
    totalTaxes += taxes;
    
    const netEarnings = grossEarnings - taxes;
    totalEarnings += grossEarnings;
    
    const endingBalance = balanceAfterContribution + netEarnings;
    
    yearlyBreakdown.push({
      year,
      startingBalance: parseFloat(startingBalance.toFixed(2)),
      contributions: parseFloat(contributions.toFixed(2)),
      earnings: parseFloat(grossEarnings.toFixed(2)),
      taxes: parseFloat(taxes.toFixed(2)),
      endingBalance: parseFloat(endingBalance.toFixed(2))
    });
    
    balance = endingBalance;
  }

  return {
    finalBalance: parseFloat(balance.toFixed(2)),
    totalContributions: parseFloat(totalContributions.toFixed(2)),
    totalEarnings: parseFloat(totalEarnings.toFixed(2)),
    totalTaxes: parseFloat(totalTaxes.toFixed(2)),
    yearlyBreakdown
  };
};
