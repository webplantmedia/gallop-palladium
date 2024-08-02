export const hasExactClass = (classString: any, className: string) => {
  if (!classString) {
    return false;
  }
  // Create a regular expression to match the exact class name
  let regex = new RegExp(`(^|\\s)${className}(\\s|$)`);
  return regex.test(classString);
};
