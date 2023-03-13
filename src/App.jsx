import { useState } from "react";

function App() {
  const numbers = Array.from({length: 10}, (_, i) => (i == 9) ? 0 : i + 1);
  const operators = ['+', '-', '*', '/']
  const [total, setTotal] = useState(0);
  
  function handleNumber(n){
    let number = total == 0 ? n : `${total}${n}`;
    setTotal(number);
  }

  function handleOperator(o){
    const t = total.toString();
    if(t.length > 0 && t != 0 && !operators.includes(t[t.length - 1])) setTotal(`${total}${o}`);
  }

  return (
    <div className="calculator">
      <div>
        <input value={total} onChange={null} disabled></input>
      </div>
      <div className="pad">
        <div className="numbers">
          {
            numbers.map((n) => <div key={n} onClick={() => handleNumber(n)}>{n}</div>)
          }
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
