import React, { useState } from "react";
import RequestForm from "../components/RequestForm";
import FactCard from "../components/FactCard";
import { Link } from "react-router-dom";
import { RequestedFact } from "../types";

import "./HomePage.css";

const HomePage: React.FC = () => {
  const [requestedFacts, setRequestedFacts] = useState<RequestedFact[]>([]);

  const handleAddFact = (fact: RequestedFact) => {
    setRequestedFacts((prevFacts) => [...prevFacts, fact]);
  };

  const handleRemoveFact = (id: string) => {
    setRequestedFacts((prevFacts) =>
      prevFacts.filter((fact) => fact.id !== id)
    );
  };

  return (
    <div className="home-page-container">
      <h1 className="main-title">Информация о числах и датах</h1>
      <p className="description">
        Получайте интересные факты о числах и датах с помощью NumbersAPI.
      </p>
      <RequestForm onAddFact={handleAddFact} />

      {requestedFacts.length > 0 && (
        <>
          <h2 className="section-title">Ваши запросы</h2>
          <div className="facts-list">
            {requestedFacts.map((fact) => (
              <FactCard key={fact.id} fact={fact} onRemove={handleRemoveFact} />
            ))}
          </div>
          <div className="view-facts-button-container">
            <Link
              to="/facts"
              state={{ facts: requestedFacts }}
              className="view-facts-button"
            >
              Посмотреть все факты
            </Link>
          </div>
        </>
      )}

      {requestedFacts.length === 0 && (
        <p className="no-facts-message">
          Добавьте запрос, чтобы увидеть факты здесь.
        </p>
      )}
    </div>
  );
};

export default HomePage;
