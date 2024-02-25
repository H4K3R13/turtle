import { useState } from "react";
import turtleLogo from "../public/turtle.png";
import Add from "./components/Add";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="header">
        <a href="https://vitejs.dev" target="_blank">
          <img src={turtleLogo} className="logo" alt="turtle logo" />
        </a>
        <h1>turtle</h1>
      </div>
      <Add />
    </>
  );
}

export default App;
