export function formatDate(dateString: string): string {
  const targetDate = new Date(dateString);
  return (
    targetDate.getMonth() +
    1 +
    '/' +
    targetDate.getDate() +
    '/' +
    targetDate.getFullYear()
  );
}
