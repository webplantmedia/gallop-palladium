'use client';

import { useState, useEffect } from 'react';
import { parse, format } from 'date-fns';
import classNames from 'classnames';

export default function CurrentTime({ dayOfWeek, timeRange }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Create an interval to update the time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Function to convert the given date to CST/CDT
  const convertToCST = (date) => {
    return new Date(
      date.toLocaleString('en-US', { timeZone: 'America/Chicago' })
    );
  };

  // Function to parse time strings to Date objects in CST/CDT
  const parseTime = (timeString) => {
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

  let checkTime = false;
  // Ensure timeRange is defined and in the correct format
  if (!timeRange || !timeRange.includes('-')) {
    checkTime = true;
  }

  let isWithinLimits = false;

  if (checkTime) {
    // Parse the timeRange string into lower and upper limits
    const [lowerLimit, upperLimit] = timeRange.split('-');
    if (checkTime && lowerLimit && upperLimit) {
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
        'block font-bold'
      )}
    >
      {formattedTime}
    </div>
  );
}
