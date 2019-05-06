import React from "react";
import ReactDOM from "react-dom";
import Rate from "./class/Rate";
import "./styles.scss";

function App() {
  return (
    <div>
      <Rate baseCurrency="EUR" currency="USD" />
      <Rate baseCurrency="USD" currency="GBP" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
