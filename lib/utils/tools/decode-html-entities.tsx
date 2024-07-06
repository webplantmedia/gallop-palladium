export function decodeHTMLEntities(rawStr: string) {
  return rawStr.replace(
    /&#(\d+);/g,
    (match, dec) => `${String.fromCharCode(dec)}`
  );
}
