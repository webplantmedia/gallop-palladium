import {
  parseISO,
  differenceInDays,
  endOfDay,
  isValid,
  formatISO,
} from 'date-fns';

export function daysFromToday(dateInput: string | Date): string {
  try {
    let targetDate: Date;

    // Check if the input is already a Date object or a string that needs parsing
    if (typeof dateInput === 'string') {
      targetDate = parseISO(dateInput); // Parse string to Date object
    } else if (dateInput instanceof Date && isValid(dateInput)) {
      targetDate = dateInput; // Use the Date object directly
    } else {
      throw new Error('Input is neither a valid string nor a Date object');
    }

    const today = endOfDay(new Date()); // Get today's date with time set to end of day
    var difference: any; // Calculate the difference in days

    if (process.env.NEXT_PUBLIC_LIVE_URL == 'http://localhost:3000') {
      difference = differenceInDays(today, targetDate);
    } else {
      const dateWithTimezone = new Date(dateInput);
      const isoDateString = dateWithTimezone.toISOString();
      const isoStringWithoutTimezone = isoDateString.substring(
        0,
        isoDateString.length - 1
      );
      const dateWithoutTimezone = new Date(isoStringWithoutTimezone);

      difference = differenceInDays(today, dateWithoutTimezone);
    }

    return difference.toString(); // Convert the difference to string to maintain return type
  } catch (error) {
    console.error('Error processing the date:', dateInput, error);
    return '0'; // Returning '0' as a default for error cases
  }
}
