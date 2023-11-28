

//this is a function that takes in number of seconds and returns the date and time that is that many seconds from now
export function getFutureTime(seconds: number) {
  const date = new Date();
  date.setSeconds(date.getSeconds() + seconds);
  return date;
}

/**
 * 
 * @param time a date object
 * @returns true if the current time is greater than the time passed in
 */
export function checkIfTimeIsUp(time: Date) {
  const currentTime = new Date();
  return currentTime > time;
}

//function that saves a date object to local storage
export function saveTimeToLocalStorage(time: Date) {
  localStorage.setItem('time', JSON.stringify(time));
}

//function that gets the date object from local storage
export function getTimeFromLocalStorage() {
  const time = localStorage.getItem('time');
  return time ? new Date(JSON.parse(time)) : new Date();
}

export function clearTimeFromLocalStorage() {
  localStorage.removeItem('time');
}

export function getSecondsRemaining(time: Date) {
  const currentTime = new Date();
  return Math.floor((time.getTime() - currentTime.getTime()) / 1000);
}

export function getTimeStringOfDate(timeValue: TimeValue) {
  let timeString = '';
  const time = timeValue.time;
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;

  switch (timeValue.format) {
    case 'HH:MM:SS':
      timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      break;
    case 'HH:MM':
      timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      break;
    case 'HH:MM AM/PM':
      timeString = `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      break;
    case 'HH:MM:SS AM/PM':
      timeString = `${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
      break;
    case 'HH hours, MM minutes, and SS seconds':
      timeString = `${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
      break;
    default:
      timeString = 'Invalid format';
  }
  return timeString;
}

export interface TimeValue {
  time: Date;
  format : 'HH:MM:SS' | 'HH:MM' | 'HH:MM AM/PM' | 'HH:MM:SS AM/PM' | 'HH hours, MM minutes, and SS seconds';
}
