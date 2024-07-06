export const stripToNumeric: (input: string) => string = (input) => {
  // This regex matches any character that's not a digit or a period, then replaces it with an empty string
  return input.replace(/[^\d.]+/g, '').replace(/(\..*?)\..*/g, '$1');
};
