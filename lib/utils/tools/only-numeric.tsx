export function onlyNumeric(unit: string) {
  return Number(String(unit).replace(/\D/g, ''));
}
