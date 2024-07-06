import { isObject } from './is-object';

export function getItem(obj: any, d1 = '', d2 = '', d3 = '', d4 = '') {
  if (isObject(obj)) {
    if (d1 && d1 in obj) {
      if (d2 && d2 in obj[d1]) {
        if (d3 && d3 in obj[d1][d2]) {
          if (d4 && d4 in obj[d1][d2][d3]) {
            return obj[d1][d2][d3][d4];
          }
          return obj[d1][d2][d3];
        }
        return obj[d1][d2];
      }
      return obj[d1];
    }
  }
  return null;
}
