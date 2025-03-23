import React,{ useState } from "react";
import "./App.css";
import Login from "./Pages/LoginPage";
import LandingPage from "./pages/LandingPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
     
    <LandingPage/>
    </>
  );
}

export default App;
