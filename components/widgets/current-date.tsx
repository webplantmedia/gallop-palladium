'use client';

import { useState, useEffect } from 'react';

export default function CurrentDate({ dayString }: { dayString: string }) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    // Function to calculate the correct occurrence of the specified day
    const calculateNextDayDate = (): string => {
      const daysOfWeek = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ];

      const currentDate = new Date();
      const options = { timeZone: 'America/Chicago' };
      const currentCSTDate = new Date(
        currentDate.toLocaleString('en-US', options)
      );
      const currentDayIndex = currentCSTDate.getDay();
      const targetDayIndex = daysOfWeek.indexOf(dayString.toLowerCase());

      if (targetDayIndex === -1) {
        throw new Error('Invalid day string');
      }

      // Calculate the number of days difference
      let daysUntilTarget = targetDayIndex - currentDayIndex;

      // If the target day is earlier in the week or today, adjust to get this week's occurrence
      if (daysUntilTarget > 0) {
        // Future day in the same week (no adjustment needed)
      } else if (daysUntilTarget < 0) {
        // Past day this week, adjust to show this past occurrence
        daysUntilTarget = daysUntilTarget;
      } else {
        // If it's today, no adjustment needed
      }

      // Calculate the date of the occurrence of the target day
      const targetDate = new Date(currentCSTDate);
      targetDate.setDate(currentCSTDate.getDate() + daysUntilTarget);

      // Format the date as "month/day"
      return `${targetDate.getMonth() + 1}/${targetDate.getDate()}`;
    };

    // Calculate and set the formatted date
    const updateFormattedDate = () => {
      const date = calculateNextDayDate();
      setFormattedDate(date);
    };

    // Initial call to set the formatted date
    updateFormattedDate();

    // Set interval to recalculate the date every 60 seconds (adjust as needed)
    const intervalId = setInterval(updateFormattedDate, 60000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dayString]);

  if (!formattedDate) {
    return null; // Avoid rendering until the date is calculated
  }

  return <>({formattedDate})</>;
}
