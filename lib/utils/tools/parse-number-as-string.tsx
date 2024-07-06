export const parseNumberAsString = (input: string): string | null => {
  const num = Number(input);
  if (!isNaN(num) && isFinite(num)) {
    return num.toString();
  }
  return null;
};
