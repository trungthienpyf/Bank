import "./App.css";
import HomePage from "./Components/Home/HomePage";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import { useState } from "react";
import MoveMoney from "./Components/MoveMoney/MoveMoney";
import HistoryPayment from "./Components/HistoryPayment/HistoryPayment";

import CreateSim from "./Components/PostSim/CreateSim";
import PostSims from "./Components/PostSim/PostSims";
import PostSim from "./Components/PostSim/PostSim";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedRoutesLog from "./ProtectedRoutesLog";
import PostReward from "./Components/PostSim/PostReward";
import PostByUser from "./Components/PostSim/PostByUser";

function App() {
  return (
    <HashRouter>
      <NavBar />
      <div className="App">
        <Routes>
          <Route element={<ProtectedRoutesLog />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<HomePage />} />

            <Route path="/move-money" element={<MoveMoney />} />
            <Route path="/history-payment" element={<HistoryPayment />} />
            <Route path="/post-sim" element={<PostSims />} />

            <Route path="/post-sim/:id" element={<PostSim />} />
            <Route path="/create-post-sim" element={<CreateSim />} />
            <Route path="/post-reward" element={<PostReward />} />
            <Route path="/post-by-user" element={<PostByUser />} />
          </Route>
          <Route path="*" element={<>404 not found</>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
