'use client';

import { useState, useEffect } from 'react';
import { parse } from 'date-fns';
import { utcToZonedTime, format } from 'date-fns-tz';

export default function CurrentTime({ dayOfWeek, lowerLimit, upperLimit }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const timeZone = 'America/Chicago'; // CST time zone

  useEffect(() => {
    // Create an interval to update the time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Function to parse time strings to Date objects in CST
  const parseTime = (timeString) => {
    return utcToZonedTime(parse(timeString, 'h:mma', new Date()), timeZone);
  };

  // Get the current day and time in CST
  const currentCSTTime = utcToZonedTime(currentTime, timeZone);
  const currentDayOfWeek = format(currentCSTTime, 'EEEE').toLowerCase(); // Get current day of the week

  // Parse the lower and upper time limits
  const lowerTime = parseTime(lowerLimit);
  const upperTime = parseTime(upperLimit);

  // Check if current time is within the specified limits
  const isWithinLimits =
    currentCSTTime >= lowerTime && currentCSTTime <= upperTime;

  // Check if the day matches
  if (dayOfWeek.toLowerCase() !== currentDayOfWeek) {
    return null; // Return nothing if the day doesn't match
  }

  // Format the current time for display
  const formattedTime = format(currentCSTTime, 'h:mm:ss a');

  return (
    <div>
      <p style={{ color: isWithinLimits ? 'green' : 'red' }}>
        Current Time: {formattedTime}
      </p>
    </div>
  );
}
