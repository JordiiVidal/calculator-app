import { useState } from "react";

function App() {
  const numbers = Array.from({ length: 10 }, (_, i) => (i == 9) ? 0 : i + 1);
  const operators = ['/', 'x', '-', '+']
  const [calculation, setCalculation] = useState('');
  const [total, setTotal] = useState(0);
  const [nextNumber, setNextNumber] = useState(true);

  function handleNumber(n) {
    let number = total == 0 || nextNumber ? n : `${total}${n}`;
    setNextNumber(false);
    setTotal(number);
  }

  function handleOperator(o) {
    const t = total.toString();
    if (t.length > 0 && t != 0 && !operators.includes(t[t.length - 1])) {
      setCalculation(`${calculation} ${total} ${o}`);
      setNextNumber(true);
    }
  }

  function handleResult() {
    const calc = calculation.toString();
    const t = total.toString();
    if(calc == '' || t == 0 || t == '') return;
    let operations = `${calc} ${t}`.trim().split(' ');
    do{
      operations.forEach((o, i) => {
        if (operations.includes(o)){
          operations = doOperation(o, operations, i);
          return;
        }
      });
    }while(operations.length > 1)

    setCalculation('');
    setTotal(parseInt(operations[0]));
  }

  function handleReset() {
    setTotal(0);
    setCalculation('');
  }

  function doOperation(operator, operations, i){
    let result;
    switch (operator) {
      case '+':
        result = Number(operations[i - 1]) + Number(operations[i + 1]);
        break;
      case '-':
        result = Number(operations[i - 1]) - Number(operations[i + 1]);
        break;
      case 'x':
        result = Number(operations[i - 1]) * Number(operations[i + 1]);
        break;
      case '/':
        result = Number(operations[i - 1]) / Number(operations[i + 1]);
        break;
    }
    if(result){
      operations[i] = result;
      operations.splice(i + 1, 1);
      operations.splice(i - 1, 1);
    }
    return operations;
  }


  return (
    <div className="calculator">
      <div className="calculation">
        <small>{calculation}</small>
        <span>{total}</span>
      </div>
      <div className="pad">
        <div className="numbers">
          {
            numbers.map((n) => <div key={n} onClick={() => handleNumber(n)}>{n}</div>)
          }
          <div className="result" onClick={handleResult}>=</div>
          <div className="reset" onClick={handleReset}>CE</div>
        </div>
        <div className="operators">
          {
            operators.map((o) => <div key={o} onClick={() => handleOperator(o)}>{o}</div>)
          }
        </div>
      </div>
    </div>
  )
}

export default App
