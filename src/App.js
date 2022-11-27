import "./App.css";
import HomePage from "./Components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import { useState } from "react";
import MoveMoney from "./Components/MoveMoney/MoveMoney";
import HistoryPayment from "./Components/HistoryPayment/HistoryPayment";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/move-money" element={<MoveMoney />} />
          <Route path="/history-payment" element={<HistoryPayment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
