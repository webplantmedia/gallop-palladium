import { parseISO, isValid } from 'date-fns';

export function getHoursInserted(dateInput: string | Date): number {
  try {
    let targetDate: Date;

    // Check if the input is already a Date object or a string that needs parsing
    if (typeof dateInput === 'string') {
      targetDate = parseISO(dateInput); // Parse string to Date object
      if (!isValid(targetDate)) {
        throw new Error('Invalid date string');
      }
    } else if (dateInput instanceof Date && isValid(dateInput)) {
      targetDate = dateInput; // Use the Date object directly
    } else {
      throw new Error('Input is neither a valid string nor a Date object');
    }

    // Function to get the hours in CST
    function getHoursInCST(date: Date): number {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Chicago',
        hour: 'numeric',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat('en-US', options);
      return parseInt(formatter.format(date), 10);
    }

    // const currentHours = getHoursInCST(new Date()); // Get current hours in CST
    var inputHours: number;
    const currentHours = new Date().getHours();

    if (process.env.NEXT_PUBLIC_LIVE_URL == 'http://localhost:3000') {
      inputHours = targetDate.getHours();
    } else {
      const dateWithTimezone = new Date(dateInput);
      const isoDateString = dateWithTimezone.toISOString();
      const isoStringWithoutTimezone = isoDateString.substring(
        0,
        isoDateString.length - 1
      );
      const dateWithoutTimezone = new Date(isoStringWithoutTimezone);

      inputHours = dateWithoutTimezone.getHours();
    }

    const difference = currentHours - inputHours; // Calculate the difference in hours

    return difference; // Return the difference as a number
  } catch (error) {
    console.error('Error processing the date:', dateInput, error);
    return 0; // Returning '0' as a default for error cases
  }
}
