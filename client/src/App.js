import { useState } from 'react';
import Axios from "axios";
import './App.css';

function App() {
  const border = "10px solid red";
  const [valueButton, setValueButton] = useState([1]);

  const reset = () => {
    Axios.get(`http://localhost:3001/reset`).then(res => {
      setValueButton(res.data);
    });
  }

  const handleClick = (e) => {
    let { value } = e.target;
    Axios.get(`http://localhost:3001/api/transition/${value}`).then((res) => {
      if (res.data) {
        setValueButton(res.data);
      }
    });
  }

  return (
    <div className="App">
      <div>
        <button className="btnGreen" style={{ border: valueButton.indexOf(2) >= 0 ? border : "" }} onClick={handleClick} value="2" disabled={valueButton.indexOf(2) >= 0 ? false : true}>Green</button>
      </div>
      <div>
        <button className="btnBlue" style={{ border: valueButton.indexOf(1) >= 0 ? border : "" }} onClick={handleClick} value="1" disabled={valueButton.indexOf(1) >= 0 ? false : true}>Blue</button>
        <button className="btnReset" onClick={reset}>Reset</button>
      </div>
      <div>
        <button className="btnYellow" style={{ border: valueButton.indexOf(3) >= 0 ? border : "" }} onClick={handleClick} value="3" disabled={valueButton.indexOf(3) >= 0 ? false : true}>Yellow</button>
      </div>
    </div>
  );
}

export default App;
