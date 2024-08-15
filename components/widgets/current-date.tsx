'use client';

import { useState, useEffect } from 'react';

export default function CurrentDate({ dayString }: { dayString: string }) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    // Function to calculate the correct occurrence of the specified day
    const calculateNextDayDate = (): string => {
      const daysOfWeek = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ];

      const currentDate = new Date();
      const options = { timeZone: 'America/Chicago' };
      const currentCSTDate = new Date(
        currentDate.toLocaleString('en-US', options)
      );
      const currentDayIndex = (currentCSTDate.getDay() + 6) % 7; // Adjusting so week starts on Monday
      const targetDayIndex = daysOfWeek.indexOf(dayString.toLowerCase());

      if (targetDayIndex === -1) {
        throw new Error('Invalid day string');
      }

      // Calculate the number of days difference
      let daysUntilTarget = targetDayIndex - currentDayIndex;

      // Adjust logic:
      // - If daysUntilTarget is negative, it means the target day was earlier in the week, so it should stay in this week.
      // - If daysUntilTarget is positive, it means the target day is later in the week, so use it as is.
      // - If daysUntilTarget is zero, it is today, so no adjustment needed.
      if (daysUntilTarget < 0) {
        // Calculate the past occurrence (this week's occurrence)
        const targetDate = new Date(currentCSTDate);
        targetDate.setDate(currentCSTDate.getDate() + daysUntilTarget);
        return `${targetDate.getMonth() + 1}/${targetDate.getDate()}`;
      } else {
        // Calculate the upcoming occurrence
        const targetDate = new Date(currentCSTDate);
        targetDate.setDate(currentCSTDate.getDate() + daysUntilTarget);
        return `${targetDate.getMonth() + 1}/${targetDate.getDate()}`;
      }
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
