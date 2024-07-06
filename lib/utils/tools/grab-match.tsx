export function grabMatch(regex: any, html: string) {
  var r = new RegExp(regex, 'g');

  let obj = r.exec(html);
  if (obj && typeof obj === 'object' && 1 in obj) {
    return obj[1];
  } else return '';
}
