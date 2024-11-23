export function objectMap<T, U>(
  obj: T | null | undefined,
  callback: (
    key: string, // Force key to always be a string
    value: T[keyof T],
    index: number
  ) => U | null | undefined
): U[] {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return [];
  }

  const results: U[] = [];
  let index = 0;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const result = callback(key, obj[key], index++); // Key is now string
      if (result != null) {
        results.push(result);
      }
    }
  }

  return results;
}
