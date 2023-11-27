'use client'

import { useEffect, useState } from "react";
import { getFutureTime, checkIfTimeIsUp, saveTimeToLocalStorage, getTimeFromLocalStorage, getSecondsRemaining, clearTimeFromLocalStorage } from "../utils/timerUtils";
import { get } from "http";

export function BasicTimer({ length }
  :
  { length: number }
) {

  //the length of the timer is given in seconds, so we will call the getFutureTime function to get the time in the future that the timer will end
  //we will then use that time to calculate the seconds remaining

  const timeStarted = new Date();
  const timeWillEnd : Date = getFutureTime(length);
  const timeRemaining : number = getSecondsRemaining(timeWillEnd);
  
  return (
    <div>
      <p> time started: {timeStarted.toDateString()}</p>
      <p> length: {length}</p>
      <p> time remaining: {getSecondsRemaining(timeWillEnd)}</p>
    </div>
  )

}