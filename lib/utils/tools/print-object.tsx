export const printObject = (obj: any, indent: any = '') => {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      console.log(`${indent}${key}:`);
      printObject(obj[key], indent + '  '); // Increase the indent for nested objects
    } else {
      console.log(`${indent}${key}: ${obj[key]}`);
    }
  }
};
