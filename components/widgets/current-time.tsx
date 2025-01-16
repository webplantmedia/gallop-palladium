'use client';

import { useState, useEffect } from 'react';
import { parse, format, isValid } from 'date-fns';
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
    setCurrentTime(new Date());
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!currentTime) {
    return null;
  }

  // Convert date to CST/CDT
  const convertToCST = (date: Date): Date => {
    const utcTime = date.getTime();
    const offset = new Date()
      .toLocaleString('en-US', { timeZone: 'America/Chicago' })
      .includes('Daylight')
      ? -5
      : -6;

    const cstTime = utcTime + offset * 60 * 60 * 1000;

    return new Date(cstTime);
  };

  // Parse time strings to Date objects in CST/CDT
  const parseTime = (timeString: string): Date | null => {
    // Standardize the time string to include minutes if they are missing
    const standardizedTimeString = timeString.includes(':')
      ? timeString
      : timeString.replace(/(am|pm)/, ':00$1');

    // Attempt to parse the time using the standardized format
    const parsedDate = parse(standardizedTimeString, 'h:mma', new Date());
    if (!isValid(parsedDate)) {
      console.error(`Invalid time format: ${timeString}`);
      return null;
    }
    return convertToCST(parsedDate);
  };

  const currentCSTTime = convertToCST(currentTime);
  const currentDayOfWeek = format(currentCSTTime, 'EEEE').toLowerCase();

  if (dayOfWeek.toLowerCase() !== currentDayOfWeek) {
    return null;
  }

  let isWithinLimits = false;

  if (timeRange && timeRange.includes('-')) {
    const [lowerLimit, upperLimit] = timeRange.split('-');
    if (lowerLimit && upperLimit) {
      const lowerTime = parseTime(lowerLimit.trim());
      const upperTime = parseTime(upperLimit.trim());

      if (lowerTime && upperTime) {
        isWithinLimits =
          currentCSTTime >= lowerTime && currentCSTTime <= upperTime;
      }
    }
  }

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
