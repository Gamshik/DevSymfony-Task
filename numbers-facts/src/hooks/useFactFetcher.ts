import { useState, useCallback } from "react";
import { fetchNumberFact } from "../api/numbers.api";
import { NumberFactResponse, LoadingState, FactType } from "../types";

/**
 * Пользовательский хук для получения фактов о числах.
 * Предоставляет состояние загрузки, данных и ошибок.
 */
export const useFactFetcher = () => {
  const [data, setData] = useState<NumberFactResponse | null>(null);
  const [loading, setLoading] = useState<LoadingState>("idle");
  const [error, setError] = useState<string | null>(null);

  /**
   * Функция для выполнения запроса к NumbersAPI.
   * @param number Строка числа/даты или 'random'.
   * @param type Тип факта.
   */
  const getFact = useCallback(async (number: string, type: FactType) => {
    setLoading("loading");
    setError(null);
    setData(null);
    try {
      const result = await fetchNumberFact(number, type);
      setData(result);
      setLoading("success");
      return result; // Возвращаем результат, чтобы его можно было использовать вне хука
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Произошла неизвестная ошибка.";
      setError(errorMessage);
      setLoading("error");
      throw err; // Пробрасываем ошибку дальше
    }
  }, []); // Пустой массив зависимостей, так как функция не зависит от пропсов или стейта

  return { data, loading, error, getFact };
};
