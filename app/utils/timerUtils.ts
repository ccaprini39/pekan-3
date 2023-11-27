

//this is a function that takes in number of seconds and returns the date and time that is that many seconds from now
export function getFutureTime (seconds: number) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + seconds);
    return date;
}

/**
 * 
 * @param time a date object
 * @returns true if the current time is greater than the time passed in
 */
export function checkIfTimeIsUp (time: Date) {
    const currentTime = new Date();
    return currentTime > time;
}

//function that saves a date object to local storage
export function saveTimeToLocalStorage (time: Date) {
    localStorage.setItem('time', JSON.stringify(time));
}

//function that gets the date object from local storage
export function getTimeFromLocalStorage () {
    const time = localStorage.getItem('time');
    return time ? new Date(JSON.parse(time)) : new Date();
}

export function clearTimeFromLocalStorage () {
    localStorage.removeItem('time');
}

export function getSecondsRemaining (time: Date) {
    const currentTime = new Date();
    return Math.floor((time.getTime() - currentTime.getTime()) / 1000);
}

const time = new Date();

// example output: Mon Nov 27 2023
console.log(time.toDateString());

// example output: Mon, 27 Nov 2023 00:00:00 GMT
console.log(time.toUTCString());

// example output: Mon Nov 27 2023 00:00:00 GMT+0000 (Coordinated Universal Time)
console.log(time.toString());

// example output: 2023-11-27T00:00:00.000Z
console.log(time.toISOString());

// example output: 2023-11-27
console.log(time.toISOString().split('T')[0]);

// 1. HH:MM:SS format
const time1 = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`;
console.log(time1); // example output: 13:45:30

// 2. HH:MM format
const time2 = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
console.log(time2); // example output: 13:45

// 3. HH:MM AM/PM format
const hours = time.getHours();
const ampm = hours >= 12 ? 'PM' : 'AM';
const time3 = `${hours % 12 || 12}:${time.getMinutes().toString().padStart(2, '0')} ${ampm}`;
console.log(time3); // example output: 1:45 PM

// 4. HH:MM:SS AM/PM format
const time4 = `${hours % 12 || 12}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')} ${ampm}`;
console.log(time4); // example output: 1:45:30 PM

// 5. HH hours, MM minutes, and SS seconds
const time5 = `${time.getHours()} hours, ${time.getMinutes()} minutes, and ${time.getSeconds()} seconds`;
console.log(time5); // example output: 13 hours, 45 minutes, and 30 seconds