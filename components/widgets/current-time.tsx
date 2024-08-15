'use client';

import { useState, useEffect } from 'react';
import { parse, format } from 'date-fns';
import classNames from 'classnames';

export default function CurrentTime({
  dayOfWeek,
  timeRange,
}: {
  dayOfWeek: string;
  timeRange: string;
}) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set the initial time and start the interval only after the component mounts
    setCurrentTime(new Date());
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  if (!currentTime) {
    // Avoid rendering until the time is set on the client side
    return null;
  }

  // Function to convert the given date to CST/CDT
  const convertToCST = (date: Date): Date => {
    return new Date(
      date.toLocaleString('en-US', { timeZone: 'America/Chicago' })
    );
  };

  // Function to parse time strings to Date objects in CST/CDT
  const parseTime = (timeString: string): Date => {
    const date = parse(timeString, 'h:mma', new Date());
    return convertToCST(date);
  };

  // Get the current time in CST/CDT
  const currentCSTTime = convertToCST(currentTime);
  const currentDayOfWeek = format(currentCSTTime, 'EEEE').toLowerCase(); // Get current day of the week

  // Check if the day matches
  if (dayOfWeek.toLowerCase() !== currentDayOfWeek) {
    return null; // Return nothing if the day doesn't match
  }

  let isWithinLimits = false;

  // Ensure timeRange is defined and in the correct format
  if (timeRange && timeRange.includes('-')) {
    // Parse the timeRange string into lower and upper limits
    const [lowerLimit, upperLimit] = timeRange.split('-');
    if (lowerLimit && upperLimit) {
      const lowerTime = parseTime(lowerLimit.trim());
      const upperTime = parseTime(upperLimit.trim());

      // Check if current time is within the specified limits
      isWithinLimits =
        currentCSTTime >= lowerTime && currentCSTTime <= upperTime;
    }
  }

  // Format the current time for display
  const formattedTime = format(currentCSTTime, 'h:mm:ss a');

  return (
    <div
      className={classNames(
        isWithinLimits ? 'text-green-700' : 'text-red-700',
        'font-bold flex justify-between w-full'
      )}
    >
      <span>{isWithinLimits ? 'Open' : 'Closed'}</span>
      {formattedTime}
    </div>
  );
}
