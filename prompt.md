You are an expert full-stack software engineer. Your task is to generate the complete source code for a web application based *only* on the `Feature Specification` and `Implementation Plan` provided below.

Your goal is to "one-shot" this task, producing a complete, runnable project.

### 📜 Core Directives

1.  **Tech Stack**: You MUST use the specified stack: **React**, **Chart.js** (for the graph), **SCSS** (using **BEM** methodology), and **Jest** / **React Testing Library** (for tests).
2.  **Completeness**: The `Implementation Plan` is missing key files. You MUST generate **all** files needed for a complete, runnable React application. This includes:
    * A `package.json` file listing all required dependencies (react, react-dom, chart.js, react-chartjs-2, jest, @testing-library/react, node-sass, etc.).
    * A `public/index.html` file with a root element (e.g., `<div id="root"></div>`).
    * An entry point `src/index.js` to render the React app.
    * A main `src/App.js` component to manage state and layout.
    * The component files: `src/components/InputForm.js`, `src/components/GrowthChart.js`, `src/components/YearlyBreakdownTable.js`.
    * The logic file: `src/lib/projectionLogic.js`.
    * The SCSS files: `src/styles/base.scss` (for global styles) and `src/styles/dark-theme.scss`. You should also create a main `src/App.scss` to import them and apply the dark theme (per **FR-005**).
    * The test files: `tests/unit/projectionLogic.test.js` and `tests/unit/InputForm.test.js`.
3.  **Resolve Contradiction**: The plan mentions `src/lib/indexedDB.js` but the `Technical Context` states "Storage: None (in-memory calculations)". You MUST **adhere to the 'in-memory' requirement**. Do **NOT** generate the `indexedDB.js` file. All state must be managed within the React components.
4.  **Functionality**:
    * The `projectionLogic.js` file must contain the core calculation logic, adhering to the yearly breakdown (Starting, Contributions, Earnings, Taxes, Ending) from **FR-004** and **not** including inflation (per **FR-007**).
    * `InputForm.js` must implement all fields from **FR-001** and include real-time validation (per **FR-002**) and the "Autofill" button (per **FR-006**).
    * `GrowthChart.js` must use `react-chartjs-2` to render a line chart with tooltips (per **FR-003**).
    * `YearlyBreakdownTable.js` must render the table with the exact columns from the clarification.
    * `App.js` must orchestrate the state, passing data from the form to the logic, and then passing the results to the chart and table.
5.  **Testing**: The generated Jest tests must provide meaningful coverage.
    * `projectionLogic.test.js` must test the calculation logic, including the edge cases mentioned in the spec (zeros, 0% return).
    * `InputForm.test.js` should test the validation logic (e.g., retirement age < current age) and the autofill feature.
6.  **Output Format**: You MUST present the response as a complete, file-by-file code dump. Use a clear file path heading (e.g., `### src/App.js`) for each file. Do not include any other conversation or explanation outside of the code blocks.

