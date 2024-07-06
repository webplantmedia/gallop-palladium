export function prettyDate(dateString: string): string {
  const dateInserted = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = dateInserted.toLocaleDateString('en-US', options);

  return formattedDate;
}
