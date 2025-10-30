import { calculateProjection } from '../../src/lib/projectionLogic';

describe('projectionLogic', () => {
  describe('calculateProjection', () => {
    it('should calculate projection with typical inputs', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 35,
        currentSavings: 10000,
        annualContribution: 5000,
        expectedReturn: 10,
        taxRate: 20
      };

      const result = calculateProjection(inputs);

      expect(result).toHaveProperty('finalBalance');
      expect(result).toHaveProperty('totalContributions');
      expect(result).toHaveProperty('totalEarnings');
      expect(result).toHaveProperty('totalTaxes');
      expect(result).toHaveProperty('yearlyBreakdown');
      expect(result.yearlyBreakdown).toHaveLength(5);

      expect(result.totalContributions).toBe(25000);
      expect(result.finalBalance).toBeGreaterThan(inputs.currentSavings);
      expect(result.totalTaxes).toBeGreaterThan(0);
    });

    it('should handle zero annual contribution', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 32,
        currentSavings: 10000,
        annualContribution: 0,
        expectedReturn: 10,
        taxRate: 20
      };

      const result = calculateProjection(inputs);

      expect(result.totalContributions).toBe(0);
      expect(result.yearlyBreakdown).toHaveLength(2);
      result.yearlyBreakdown.forEach(year => {
        expect(year.contributions).toBe(0);
      });
    });

    it('should handle zero expected return', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 32,
        currentSavings: 10000,
        annualContribution: 5000,
        expectedReturn: 0,
        taxRate: 20
      };

      const result = calculateProjection(inputs);

      expect(result.totalEarnings).toBe(0);
      expect(result.totalTaxes).toBe(0);
      expect(result.finalBalance).toBe(20000);
      result.yearlyBreakdown.forEach(year => {
        expect(year.earnings).toBe(0);
        expect(year.taxes).toBe(0);
      });
    });

    it('should handle zero tax rate', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 32,
        currentSavings: 10000,
        annualContribution: 5000,
        expectedReturn: 10,
        taxRate: 0
      };

      const result = calculateProjection(inputs);

      expect(result.totalTaxes).toBe(0);
      result.yearlyBreakdown.forEach(year => {
        expect(year.taxes).toBe(0);
      });
    });

    it('should handle zero current savings', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 32,
        currentSavings: 0,
        annualContribution: 5000,
        expectedReturn: 10,
        taxRate: 20
      };

      const result = calculateProjection(inputs);

      expect(result.yearlyBreakdown[0].startingBalance).toBe(0);
      expect(result.finalBalance).toBeGreaterThan(0);
    });

    it('should calculate yearly breakdown correctly', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 32,
        currentSavings: 10000,
        annualContribution: 5000,
        expectedReturn: 10,
        taxRate: 20
      };

      const result = calculateProjection(inputs);

      const year1 = result.yearlyBreakdown[0];
      expect(year1.year).toBe(31);
      expect(year1.startingBalance).toBe(10000);
      expect(year1.contributions).toBe(5000);
      
      const balanceAfterContribution = 10000 + 5000;
      const grossEarnings = balanceAfterContribution * 0.1;
      const taxes = grossEarnings * 0.2;
      const netEarnings = grossEarnings - taxes;
      const endingBalance = balanceAfterContribution + netEarnings;

      expect(year1.earnings).toBeCloseTo(grossEarnings, 2);
      expect(year1.taxes).toBeCloseTo(taxes, 2);
      expect(year1.endingBalance).toBeCloseTo(endingBalance, 2);

      const year2 = result.yearlyBreakdown[1];
      expect(year2.startingBalance).toBeCloseTo(year1.endingBalance, 2);
    });

    it('should handle single year projection', () => {
      const inputs = {
        currentAge: 64,
        retirementAge: 65,
        currentSavings: 100000,
        annualContribution: 10000,
        expectedReturn: 7,
        taxRate: 15
      };

      const result = calculateProjection(inputs);

      expect(result.yearlyBreakdown).toHaveLength(1);
      expect(result.yearlyBreakdown[0].year).toBe(65);
    });

    it('should round all monetary values to 2 decimal places', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 32,
        currentSavings: 10000.123,
        annualContribution: 5000.456,
        expectedReturn: 7.333,
        taxRate: 15.555
      };

      const result = calculateProjection(inputs);

      expect(Number.isInteger(result.finalBalance * 100)).toBe(true);
      expect(Number.isInteger(result.totalContributions * 100)).toBe(true);
      expect(Number.isInteger(result.totalEarnings * 100)).toBe(true);
      expect(Number.isInteger(result.totalTaxes * 100)).toBe(true);

      result.yearlyBreakdown.forEach(year => {
        expect(Number.isInteger(year.startingBalance * 100)).toBe(true);
        expect(Number.isInteger(year.contributions * 100)).toBe(true);
        expect(Number.isInteger(year.earnings * 100)).toBe(true);
        expect(Number.isInteger(year.taxes * 100)).toBe(true);
        expect(Number.isInteger(year.endingBalance * 100)).toBe(true);
      });
    });

    it('should accumulate totals correctly', () => {
      const inputs = {
        currentAge: 30,
        retirementAge: 35,
        currentSavings: 10000,
        annualContribution: 5000,
        expectedReturn: 10,
        taxRate: 20
      };

      const result = calculateProjection(inputs);

      const sumContributions = result.yearlyBreakdown.reduce((sum, year) => sum + year.contributions, 0);
      const sumEarnings = result.yearlyBreakdown.reduce((sum, year) => sum + year.earnings, 0);
      const sumTaxes = result.yearlyBreakdown.reduce((sum, year) => sum + year.taxes, 0);

      expect(result.totalContributions).toBeCloseTo(sumContributions, 2);
      expect(result.totalEarnings).toBeCloseTo(sumEarnings, 2);
      expect(result.totalTaxes).toBeCloseTo(sumTaxes, 2);
    });
  });
});
