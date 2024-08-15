export function getNextDayDate(dayString: string): string {
  // Define the days of the week in order
  const daysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  // Get the current date and time in CST
  const currentDate = new Date();
  const options = { timeZone: 'America/Chicago' };
  const currentCSTDate = new Date(currentDate.toLocaleString('en-US', options));

  // Get the current day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDayIndex = currentCSTDate.getDay();

  // Find the index of the target day
  const targetDayIndex = daysOfWeek.indexOf(dayString.toLowerCase());

  if (targetDayIndex === -1) {
    throw new Error('Invalid day string');
  }

  // Calculate the number of days difference
  let daysUntilTarget = targetDayIndex - currentDayIndex;

  // Adjust to get this week's past occurrence if the target day is earlier in the week
  if (daysUntilTarget > 0) {
    // Future day in the same week (do nothing)
  } else if (daysUntilTarget < 0) {
    // Past day this week (no need to adjust)
    daysUntilTarget = daysUntilTarget;
  }

  // Calculate the date of the occurrence of the target day
  const targetDate = new Date(currentCSTDate);
  targetDate.setDate(currentCSTDate.getDate() + daysUntilTarget);

  // Format the date as "month/day"
  const formattedDate = `${targetDate.getMonth() + 1}/${targetDate.getDate()}`;

  return formattedDate;
}
