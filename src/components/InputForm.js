import React, { useState, useEffect } from 'react';

const InputForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    currentAge: '',
    retirementAge: '',
    currentSavings: '',
    annualContribution: '',
    expectedReturn: '',
    taxRate: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const numValue = parseFloat(value);

    switch (name) {
      case 'currentAge':
        if (value === '' || numValue < 0 || numValue > 120) {
          return 'Current age must be between 0 and 120';
        }
        if (formData.retirementAge !== '' && numValue >= parseFloat(formData.retirementAge)) {
          return 'Current age must be less than retirement age';
        }
        break;
      case 'retirementAge':
        if (value === '' || numValue < 0 || numValue > 120) {
          return 'Retirement age must be between 0 and 120';
        }
        if (formData.currentAge !== '' && numValue <= parseFloat(formData.currentAge)) {
          return 'Retirement age must be greater than current age';
        }
        break;
      case 'currentSavings':
        if (value === '' || numValue < 0) {
          return 'Current savings must be non-negative';
        }
        break;
      case 'annualContribution':
        if (value === '' || numValue < 0) {
          return 'Annual contribution must be non-negative';
        }
        break;
      case 'expectedReturn':
        if (value === '' || numValue < 0 || numValue > 100) {
          return 'Expected return must be between 0 and 100';
        }
        break;
      case 'taxRate':
        if (value === '' || numValue < 0 || numValue > 100) {
          return 'Tax rate must be between 0 and 100';
        }
        break;
      default:
        break;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    if (name === 'currentAge' && formData.retirementAge !== '') {
      const retirementError = validateField('retirementAge', formData.retirementAge);
      setErrors(prev => ({
        ...prev,
        retirementAge: retirementError
      }));
    }

    if (name === 'retirementAge' && formData.currentAge !== '') {
      const currentAgeError = validateField('currentAge', formData.currentAge);
      setErrors(prev => ({
        ...prev,
        currentAge: currentAgeError
      }));
    }
  };

  const handleAutofill = () => {
    const autofillData = {
      currentAge: '30',
      retirementAge: '65',
      currentSavings: '50000',
      annualContribution: '10000',
      expectedReturn: '7',
      taxRate: '15'
    };
    setFormData(autofillData);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onCalculate({
      currentAge: parseFloat(formData.currentAge),
      retirementAge: parseFloat(formData.retirementAge),
      currentSavings: parseFloat(formData.currentSavings),
      annualContribution: parseFloat(formData.annualContribution),
      expectedReturn: parseFloat(formData.expectedReturn),
      taxRate: parseFloat(formData.taxRate)
    });
  };

  const isFormValid = () => {
    return Object.values(formData).every(val => val !== '') &&
           Object.values(errors).every(err => err === null || err === undefined);
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <h2 className="input-form__title">Enter Your Details</h2>
      
      <div className="input-form__group">
        <label className="input-form__label" htmlFor="currentAge">
          Current Age
        </label>
        <input
          type="number"
          id="currentAge"
          name="currentAge"
          className={`input-form__input ${errors.currentAge ? 'input-form__input--error' : ''}`}
          value={formData.currentAge}
          onChange={handleChange}
          placeholder="e.g., 30"
        />
        {errors.currentAge && (
          <span className="input-form__error">{errors.currentAge}</span>
        )}
      </div>

      <div className="input-form__group">
        <label className="input-form__label" htmlFor="retirementAge">
          Retirement Age
        </label>
        <input
          type="number"
          id="retirementAge"
          name="retirementAge"
          className={`input-form__input ${errors.retirementAge ? 'input-form__input--error' : ''}`}
          value={formData.retirementAge}
          onChange={handleChange}
          placeholder="e.g., 65"
        />
        {errors.retirementAge && (
          <span className="input-form__error">{errors.retirementAge}</span>
        )}
      </div>

      <div className="input-form__group">
        <label className="input-form__label" htmlFor="currentSavings">
          Current Savings ($)
        </label>
        <input
          type="number"
          id="currentSavings"
          name="currentSavings"
          className={`input-form__input ${errors.currentSavings ? 'input-form__input--error' : ''}`}
          value={formData.currentSavings}
          onChange={handleChange}
          placeholder="e.g., 50000"
        />
        {errors.currentSavings && (
          <span className="input-form__error">{errors.currentSavings}</span>
        )}
      </div>

      <div className="input-form__group">
        <label className="input-form__label" htmlFor="annualContribution">
          Annual Contribution ($)
        </label>
        <input
          type="number"
          id="annualContribution"
          name="annualContribution"
          className={`input-form__input ${errors.annualContribution ? 'input-form__input--error' : ''}`}
          value={formData.annualContribution}
          onChange={handleChange}
          placeholder="e.g., 10000"
        />
        {errors.annualContribution && (
          <span className="input-form__error">{errors.annualContribution}</span>
        )}
      </div>

      <div className="input-form__group">
        <label className="input-form__label" htmlFor="expectedReturn">
          Expected Annual Return (%)
        </label>
        <input
          type="number"
          step="0.1"
          id="expectedReturn"
          name="expectedReturn"
          className={`input-form__input ${errors.expectedReturn ? 'input-form__input--error' : ''}`}
          value={formData.expectedReturn}
          onChange={handleChange}
          placeholder="e.g., 7"
        />
        {errors.expectedReturn && (
          <span className="input-form__error">{errors.expectedReturn}</span>
        )}
      </div>

      <div className="input-form__group">
        <label className="input-form__label" htmlFor="taxRate">
          Tax Rate on Earnings (%)
        </label>
        <input
          type="number"
          step="0.1"
          id="taxRate"
          name="taxRate"
          className={`input-form__input ${errors.taxRate ? 'input-form__input--error' : ''}`}
          value={formData.taxRate}
          onChange={handleChange}
          placeholder="e.g., 15"
        />
        {errors.taxRate && (
          <span className="input-form__error">{errors.taxRate}</span>
        )}
      </div>

      <div className="input-form__actions">
        <button
          type="button"
          className="input-form__button input-form__button--secondary"
          onClick={handleAutofill}
        >
          Autofill
        </button>
        <button
          type="submit"
          className="input-form__button input-form__button--primary"
          disabled={!isFormValid()}
        >
          Calculate
        </button>
      </div>
    </form>
  );
};

export default InputForm;
