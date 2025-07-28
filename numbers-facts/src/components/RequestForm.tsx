import React, { useState, useEffect } from "react";
import NumberInput from "./NumberInput";
import { isValidNumber, isValidDate } from "../utils/validation";
import { useFactFetcher } from "../hooks/useFactFetcher";
import { v4 as uuidv4 } from "uuid";
import { RequestedFact, FactType } from "../types";
import "./RequestForm.css";

interface RequestFormProps {
  onAddFact: (fact: RequestedFact) => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ onAddFact }) => {
  const [numberInput, setNumberInput] = useState<string>("");
  const [selectedType, setSelectedType] = useState<FactType>("trivia");
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [inputError, setInputError] = useState<string | null>(null);

  const { getFact, loading } = useFactFetcher();

  // Сбрасываем поле ввода и ошибку при изменении типа факта или случайности
  useEffect(() => {
    setNumberInput("");
    setInputError(null);
  }, [selectedType, isRandom]);

  const handleAddRequest = async () => {
    setInputError(null); // Сбрасываем предыдущие ошибки

    if (!isRandom) {
      if (selectedType === "date") {
        if (!isValidDate(numberInput)) {
          setInputError(
            "Неверный формат даты. Используйте ММ/ДД (например, 07/28)."
          );
          return;
        }
      } else {
        if (!isValidNumber(numberInput)) {
          setInputError("Число должно быть в виде цифры.");
          return;
        }
      }
    }

    try {
      const fact = await getFact(
        isRandom ? "random" : numberInput,
        selectedType
      );

      if (fact) {
        onAddFact({
          id: uuidv4(),
          number: isRandom ? "random" : numberInput,
          type: selectedType,
          factText: fact.text,
          isRandom: isRandom,
          originalNumber: fact.number,
        });
      }
    } catch (error: any) {
      setInputError(error.message || "Произошла ошибка при получении факта.");
    }
  };

  return (
    <div className="request-form">
      <div className="form-row">
        <label htmlFor="factType">Тип информации:</label>
        <select
          id="factType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as FactType)}
          className="select-field"
        >
          <option value="trivia">Trivia (общие факты)</option>
          <option value="math">Math (математические)</option>
          <option value="date">Date (факты о датах)</option>
          <option value="year">Year (факты о годах)</option>
        </select>
      </div>

      <div className="form-row">
        <label>
          <input
            type="checkbox"
            checked={isRandom}
            onChange={(e) => setIsRandom(e.target.checked)}
          />
          Случайное число/дата/год
        </label>
      </div>

      {!isRandom && (
        <div className="form-row">
          <NumberInput
            value={numberInput}
            onChange={setNumberInput}
            factType={selectedType}
            onError={setInputError}
            autoFocus={true}
          />
        </div>
      )}

      {inputError && <p className="error-message">{inputError}</p>}

      <button
        onClick={handleAddRequest}
        disabled={loading === "loading"}
        className="add-button"
      >
        {loading === "loading" ? "Загрузка..." : "Добавить запрос"}
      </button>
    </div>
  );
};

export default RequestForm;
