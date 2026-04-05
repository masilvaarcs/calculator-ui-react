import React, { useState } from 'react';
import './App.css';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    setError('');

    if (!num1 || !num2) {
      setError('Please enter both numbers');
      return;
    }

    if (operation === 'divide' && num2 === '0') {
      setError('Error: Division by zero');
      return;
    }

    try {
      const CALCULATE_URL = `${process.env.REACT_APP_BACKEND_URL}/calculate`;

      const response = await fetch(CALCULATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ num1: parseFloat(num1), num2: parseFloat(num2), operation }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred while connecting to the server');
    }
  };

  // const handleTestCalculate = () => {
  //   const num1 = 10; // Valor de teste
  //   const num2 = 5;  // Valor de teste
  //   const operation = 'add'; // Operação de teste

  //   let result;

  //   switch (operation) {
  //     case 'add':
  //       result = num1 + num2;
  //       break;
  //     case 'subtract':
  //       result = num1 - num2;
  //       break;
  //     case 'multiply':
  //       result = num1 * num2;
  //       break;
  //     case 'divide':
  //       result = num1 / num2;
  //       break;
  //     default:
  //       result = 'Invalid operation';
  //   }

  //   setResult(result);
  // };

  const handleNum1Change = (e) => {
    const value = e.target.value;
    if (/^-?\d*\.?\d*$/.test(value)) {
      setNum1(value);
    }
  };

  const handleNum2Change = (e) => {
    const value = e.target.value;
    if (/^-?\d*\.?\d*$/.test(value)) {
      setNum2(value);
    }
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
    setError('');
  };

  const handleClear = () => {
    setNum1('');
    setNum2('');
    setResult('');
    // setTestResult('');
    setError('');
  };

  return (
    <div className="App">
      <h1 className="title">Basic Calculator</h1>
      <div className="calculator">
        <div className="input-row">
          <input type="text" className="input-field" data-testid="num1" placeholder="Number 1" value={num1} onChange={handleNum1Change} />

          <select className="operation-select" data-testid="operation-select" value={operation} onChange={handleOperationChange}>

            <option value="add">+</option>
            <option value="subtract">-</option>
            <option value="multiply">*</option>
            <option value="divide">/</option>
          </select>
          <input type="text" className="input-field" data-testid="num2" placeholder="Number 2" value={num2} onChange={handleNum2Change} />
          <button className="calculate-button" data-testid="calculate-button" onClick={handleCalculate}>Calculate</button>
        </div>
        <div className="output-row">
          <p className="result-text" data-testid="result-text">Result: {result}</p>
          <p className="error-text">{error}</p>
        </div>
        <div className="button-row">
          <button className="clear-button" onClick={handleClear}>Clear</button>
          {/* <button className="test-calculate-button" data-testid="test-calculate-button" onClick={handleTestCalculate}>Test Calculate</button> */}
        </div>
      </div>
    </div>
  );
}

export default App;
