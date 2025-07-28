import React, { useState, useEffect } from "react";
import "./NumberInput.css";
import { FactType } from "../types";

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  factType: FactType;
  onError: (error: string | null) => void;
  autoFocus?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  factType,
  onError,
  autoFocus = false,
}) => {
  const [currentValue, setCurrentValue] = useState<string>(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCurrentValue(newValue);
    onChange(newValue);
    onError(null);
  };

  const handleNumberChange = (increment: boolean) => {
    const num = parseInt(currentValue, 10);
    if (!isNaN(num)) {
      const newValue = (increment ? num + 1 : num - 1).toString();
      setCurrentValue(newValue);
      onChange(newValue);
      onError(null);
    } else {
      onError("Введите число для изменения.");
    }
  };

  const handleDateChange = (increment: boolean) => {
    const parts = currentValue.split("/");
    if (parts.length !== 2) {
      onError("Неверный формат даты. Используйте ММ/ДД.");
      return;
    }

    let month = parseInt(parts[0], 10);
    let day = parseInt(parts[1], 10);

    if (isNaN(month) || isNaN(day)) {
      onError("Введите корректные числовые значения для месяца и дня.");
      return;
    }

    const date = new Date(2000, month - 1, day);
    if (isNaN(date.getTime())) {
      onError("Введена некорректная дата.");
      return;
    }

    if (increment) {
      date.setDate(date.getDate() + 1);
    } else {
      date.setDate(date.getDate() - 1);
    }

    const newMonth = date.getMonth() + 1;
    const newDay = date.getDate();

    const formattedMonth = newMonth < 10 ? `0${newMonth}` : `${newMonth}`;
    const formattedDay = newDay < 10 ? `0${newDay}` : `${newDay}`;

    const newDateString = `${formattedMonth}/${formattedDay}`;
    setCurrentValue(newDateString);
    onChange(newDateString);
    onError(null);
  };

  const getPlaceholder = () => {
    if (factType === "date") {
      return "ММ/ДД (напр. 07/28)";
    }
    return "Введите число";
  };

  return (
    <div className="number-input-container">
      <input
        type="text"
        value={currentValue}
        onChange={handleInputChange}
        placeholder={getPlaceholder()}
        className="number-input-field"
        autoFocus={autoFocus}
      />
      <div className="number-input-buttons">
        <button
          type="button"
          onClick={() =>
            factType === "date"
              ? handleDateChange(false)
              : handleNumberChange(false)
          }
          className="number-button"
        >
          &lt;
        </button>
        <button
          type="button"
          onClick={() =>
            factType === "date"
              ? handleDateChange(true)
              : handleNumberChange(true)
          }
          className="number-button"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
