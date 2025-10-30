import React from 'react';

const YearlyBreakdownTable = ({ data }) => {
  const formatCurrency = (value) => {
    return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="breakdown-table">
      <h2 className="breakdown-table__title">Yearly Breakdown</h2>
      <div className="breakdown-table__wrapper">
        <table className="breakdown-table__table">
          <thead className="breakdown-table__head">
            <tr className="breakdown-table__row">
              <th className="breakdown-table__header">Year</th>
              <th className="breakdown-table__header">Starting Balance</th>
              <th className="breakdown-table__header">Contributions</th>
              <th className="breakdown-table__header">Earnings</th>
              <th className="breakdown-table__header">Taxes</th>
              <th className="breakdown-table__header">Ending Balance</th>
            </tr>
          </thead>
          <tbody className="breakdown-table__body">
            {data.yearlyBreakdown.map((row, index) => (
              <tr key={index} className="breakdown-table__row">
                <td className="breakdown-table__cell">{row.year}</td>
                <td className="breakdown-table__cell">{formatCurrency(row.startingBalance)}</td>
                <td className="breakdown-table__cell">{formatCurrency(row.contributions)}</td>
                <td className="breakdown-table__cell">{formatCurrency(row.earnings)}</td>
                <td className="breakdown-table__cell">{formatCurrency(row.taxes)}</td>
                <td className="breakdown-table__cell">{formatCurrency(row.endingBalance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="breakdown-table__summary">
        <div className="breakdown-table__summary-item">
          <span className="breakdown-table__summary-label">Final Balance:</span>
          <span className="breakdown-table__summary-value">{formatCurrency(data.finalBalance)}</span>
        </div>
        <div className="breakdown-table__summary-item">
          <span className="breakdown-table__summary-label">Total Contributions:</span>
          <span className="breakdown-table__summary-value">{formatCurrency(data.totalContributions)}</span>
        </div>
        <div className="breakdown-table__summary-item">
          <span className="breakdown-table__summary-label">Total Earnings:</span>
          <span className="breakdown-table__summary-value">{formatCurrency(data.totalEarnings)}</span>
        </div>
        <div className="breakdown-table__summary-item">
          <span className="breakdown-table__summary-label">Total Taxes:</span>
          <span className="breakdown-table__summary-value">{formatCurrency(data.totalTaxes)}</span>
        </div>
      </div>
    </div>
  );
};

export default YearlyBreakdownTable;
