import React, { useState } from 'react';
import InputForm from './components/InputForm';
import GrowthChart from './components/GrowthChart';
import YearlyBreakdownTable from './components/YearlyBreakdownTable';
import { calculateProjection } from './lib/projectionLogic';

function App() {
  const [projectionData, setProjectionData] = useState(null);

  const handleCalculate = (inputs) => {
    const results = calculateProjection(inputs);
    setProjectionData(results);
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Retirement Savings Calculator</h1>
      </header>
      <main className="app__main">
        <section className="app__input-section">
          <InputForm onCalculate={handleCalculate} />
        </section>
        {projectionData && (
          <>
            <section className="app__chart-section">
              <GrowthChart data={projectionData} />
            </section>
            <section className="app__table-section">
              <YearlyBreakdownTable data={projectionData} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
