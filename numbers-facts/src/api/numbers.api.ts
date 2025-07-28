// src/api/numbersApi.ts

import { FactType, NumberFactResponse } from "../types";

const BASE_URL = "http://numbersapi.com";

/**
 * Формирует URL для запроса к NumbersAPI.
 * @param number Число или строка 'random', или строка в формате 'month/day'.
 * @param type Тип факта (trivia, math, date, year).
 * @returns Строка URL.
 */
const buildApiUrl = (number: string, type: FactType): string => {
  // Для типа 'date', numbersapi ожидает формат 'month/day'
  // Для random, numbersapi ожидает 'random/type'
  if (number === "random") {
    return `${BASE_URL}/random/${type}?json`;
  }
  return `${BASE_URL}/${number}/${type}?json`;
};

/**
 * Запрашивает факт о числе или дате.
 * @param number Число (как строка) или 'random', или 'month/day'.
 * @param type Тип факта.
 * @returns Промис с объектом NumberFactResponse.
 * @throws Ошибка, если запрос не удался или не получен JSON.
 */
export const fetchNumberFact = async (
  number: string,
  type: FactType
): Promise<NumberFactResponse> => {
  const url = buildApiUrl(number, type);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // NumbersAPI возвращает 404 для "скучных" чисел, но мы можем обработать это иначе
      // Если status 200, но found: false, API уже обрабатывает "скучные" числа.
      // Здесь обрабатываем только сетевые ошибки или некорректные ответы.
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
    }
    const data: NumberFactResponse = await response.json();

    // Проверяем, что API вернуло ожидаемый JSON.
    // NumbersAPI иногда возвращает HTML для ошибок, если нет json параметра или при других проблемах
    if (typeof data.text === "undefined" || typeof data.found === "undefined") {
      throw new Error("Некорректный формат ответа от NumbersAPI.");
    }

    return data;
  } catch (error) {
    console.error("Ошибка при получении факта:", error);
    throw new Error(
      `Не удалось получить факт: ${
        error instanceof Error ? error.message : "Неизвестная ошибка"
      }`
    );
  }
};
