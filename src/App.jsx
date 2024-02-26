import { useState } from "react";
import turtleLogo from "../public/turtle.png";
import Add from "./components/Add";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  console.log("Hello Testing");
  return (
    <>
      <Navbar />
      <Add />
    </>
  );
}

export default App;
