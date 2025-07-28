/**
 * Типы запросов к API NumbersAPI.
 */
export type FactType = "trivia" | "math" | "date" | "year";

/**
 * Интерфейс для ответа от NumbersAPI в формате JSON.
 */
export interface NumberFactResponse {
  text: string;
  found: boolean;
  number: number;
  type: FactType;
  date?: string; // Для типа 'date'
  year?: string; // Для типа 'year'
}

/**
 * Интерфейс для хранения запрошенного факта вместе с введенными пользователем данными.
 */
export interface RequestedFact {
  id: string; // Уникальный ID для каждого запроса
  number: string; // Исходное число/дата, введенное пользователем (или 'random')
  type: FactType; // Тип запроса (trivia, math, date, year)
  factText: string; // Полученный текст факта
  isRandom: boolean; // Было ли это случайным запросом
  originalNumber?: number; // Фактическое число, если был random-запрос
}

/**
 * Тип для возможных состояний загрузки.
 */
export type LoadingState = "idle" | "loading" | "success" | "error";
