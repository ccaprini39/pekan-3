'use client'

import { useEffect, useState } from "react";
import { getFutureTime, checkIfTimeIsUp, saveTimeToLocalStorage, getTimeFromLocalStorage, getSecondsRemaining, clearTimeFromLocalStorage, getTimeStringOfDate, TimeValue } from "../utils/timerUtils";
import { get } from "http";

export function BasicTimer({ length }
  :
  { length: number }
) {

  //the length of the timer is given in seconds, so we will call the getFutureTime function to get the time in the future that the timer will end
  //we will then use that time to calculate the seconds remaining

  const timeStarted = new Date();
  const timeValue : TimeValue = {time: timeStarted, format: 'HH:MM:SS AM/PM'};
  const timeWillEnd : Date = getFutureTime(length);
  const timeRemaining : number = getSecondsRemaining(timeWillEnd);
  
  return (
    <div>
      <p> time started: {getTimeStringOfDate(timeValue)}</p>
      <p> length: {length} seconds</p>
      <p> time remaining: {timeRemaining} seconds</p>
    </div>
  )

}