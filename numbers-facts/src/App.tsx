import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FactsDisplayPage from "./pages/FactsDisplayPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/facts" element={<FactsDisplayPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
