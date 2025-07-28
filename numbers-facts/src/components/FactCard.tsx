import React from "react";
import "./FactCard.css";
import { RequestedFact } from "../types";

interface FactCardProps {
  fact: RequestedFact;
  onRemove: (id: string) => void;
}

const FactCard: React.FC<FactCardProps> = ({ fact, onRemove }) => {
  return (
    <div className="fact-card">
      <p className="fact-card-input-info">
        Запрос:
        {fact.isRandom
          ? ` Случайный (${fact.type})`
          : fact.type === "date"
          ? ` ${fact.number} (Дата)`
          : ` ${fact.number} (${fact.type})`}
      </p>
      {/* Отображаем 'О факте про число' только если это случайный запрос И тип не 'date' */}
      {fact.isRandom && fact.originalNumber && fact.type !== "date" && (
        <p className="fact-card-original-number">
          О факте про число: {fact.originalNumber}
        </p>
      )}
      <p className="fact-card-text">{fact.factText}</p>
      <button
        className="fact-card-remove-button"
        onClick={() => onRemove(fact.id)}
      >
        Удалить
      </button>
    </div>
  );
};

export default FactCard;
