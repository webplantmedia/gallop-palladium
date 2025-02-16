export function formatAMPM(date: any) {
  // gets the hours
  var hours = date.getHours();
  // gets the day
  var days = date.getDay();
  // gets the month
  var minutes = date.getMinutes();
  // gets AM/PM
  var ampm = hours >= 12 ? 'pm' : 'am';
  // converts hours to 12 hour instead of 24 hour
  hours = hours % 12;
  // converts 0 (midnight) to 12
  hours = hours ? hours : 12; // the hour '0' should be '12'
  // converts minutes to have leading 0
  minutes = minutes < 10 ? '0' + minutes : minutes;

  // the time string
  var time = hours + ':' + minutes + ' ' + ampm;

  // gets the match for the date string we want
  var d = date.toLocaleDateString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  //the result
  return d + ', ' + time;
}
