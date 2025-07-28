// src/utils/validation.ts

/**
 * Проверяет, является ли строка корректным числом.
 * @param input Строка для проверки.
 * @returns true, если строка является числом, иначе false.
 */
export const isValidNumber = (input: string): boolean => {
  if (!input.trim()) {
    return false;
  }
  const num = Number(input);
  return !isNaN(num) && isFinite(num);
};

/**
 * Проверяет, является ли строка корректной датой в формате ММ/ДД.
 * Использует объект Date для валидации корректности дня в месяце.
 * @param input Строка для проверки (например, "7/28" или "09/11").
 * @returns true, если строка является корректной датой, иначе false.
 */
export const isValidDate = (input: string): boolean => {
  const parts = input.split("/");
  if (parts.length !== 2) {
    return false; // Некорректное количество частей
  }

  const month = parseInt(parts[0], 10);
  const day = parseInt(parts[1], 10);

  // Проверяем, что это числа и они в допустимом диапазоне
  if (isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1) {
    return false;
  }

  // Создаем объект Date с произвольным годом (например, 2000, високосный год)
  // Важно: month - 1, так как в JavaScript месяцы от 0 до 11
  const date = new Date(2000, month - 1, day);

  // Проверяем, что месяц и день объекта Date совпадают с введенными.
  // Это ловит некорректные даты, такие как 2/30 (февраль 30) или 4/31 (апрель 31),
  // так как Date объект автоматически "перепрыгнет" на следующий месяц.
  // Например, new Date(2000, 1, 30) (февраль 30) станет March 1st.
  return date.getMonth() === month - 1 && date.getDate() === day;
};
