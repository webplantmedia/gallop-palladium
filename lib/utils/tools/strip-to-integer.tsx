export function stripToInteger(str: string): string {
  return str.replace(/\D+/g, '');
}
