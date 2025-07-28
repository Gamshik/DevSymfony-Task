import React from "react";
import { useLocation, Link } from "react-router-dom";

import "./FactsDisplayPage.css";
import { RequestedFact } from "../types";

const FactsDisplayPage: React.FC = () => {
  const location = useLocation();
  const requestedFacts: RequestedFact[] = location.state?.facts || [];

  return (
    <div className="facts-display-container">
      <h1 className="facts-display-title">Сводка по запрошенным фактам</h1>

      {requestedFacts.length === 0 ? (
        <p className="no-facts-message-display">
          Нет сохраненных фактов для отображения. Вернитесь на главную страницу,
          чтобы добавить их.
        </p>
      ) : (
        <div className="facts-grid">
          {requestedFacts.map((fact) => (
            <div key={fact.id} className="fact-item-card">
              <h3 className="fact-item-title">
                {fact.isRandom
                  ? `Случайный факт (${fact.type})`
                  : fact.type === "date"
                  ? `Факт о дате ${fact.number}`
                  : `Факт о числе ${fact.number}`}
              </h3>
              {fact.isRandom && fact.originalNumber && (
                <p className="fact-item-original-number">
                  (Фактическое число: {fact.originalNumber})
                </p>
              )}
              <p className="fact-item-text">{fact.factText}</p>
              <p className="fact-item-type">Тип: {fact.type}</p>
            </div>
          ))}
        </div>
      )}

      <div className="back-button-container">
        <Link to="/" className="back-to-home-button">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default FactsDisplayPage;
