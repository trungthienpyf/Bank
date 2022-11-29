import "./App.css";
import HomePage from "./Components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import { useState } from "react";
import MoveMoney from "./Components/MoveMoney/MoveMoney";
import HistoryPayment from "./Components/HistoryPayment/HistoryPayment";

import CreateSim from "./Components/PostSim/CreateSim";
import PostSims from "./Components/PostSim/PostSims";
import PostSim from "./Components/PostSim/PostSim";

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
          <Route path="/post-sim" element={<PostSims />} />

          <Route path="/post-sim/:id" element={<PostSim />} />
          <Route path="/create-post-sim" element={<CreateSim />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
