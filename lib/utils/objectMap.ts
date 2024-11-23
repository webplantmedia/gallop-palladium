export function objectMap<T, U>(
  obj: Record<string, T> | null | undefined, // Allow null or undefined input
  callback: (key: string, value: T, index: number) => U | null | undefined
): U[] | null {
  // Check if the input is an object
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return null; // Return null if obj is not a valid object
  }

  const results: U[] = [];
  let index = 0;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const result = callback(key, obj[key], index++);
      if (result != null) {
        results.push(result);
      }
    }
  }

  return results;
}
