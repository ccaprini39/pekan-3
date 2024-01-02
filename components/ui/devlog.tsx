'use client'

import { useEffect, useState } from 'react';
import { useDidUpdate, useIdle, useInterval } from '@mantine/hooks';
import FullScreenToggle from './FullScreen';
import { time } from 'console';

export default function DevLog(){

  const [textValue, setTextValue] = useState<string>('');
  const [shallowIdle, setShallowIdle] = useState<boolean>(false);

  const [timeSinceLastInput, setTimeSinceLastInput] = useState<number>(0);
  function runOnInterval(){
    if(timeSinceLastInput >= 10){
      setTimeSinceLastInput(0);
    } else {
      setTimeSinceLastInput(timeSinceLastInput + 1);
      setTextValue(textValue + '-');
      setTimeSinceLastInput(timeSinceLastInput + 1);
    }
  }
  const interval = useInterval(runOnInterval, 1000);
  const idle = useIdle(2000);

  useDidUpdate(() => {
    //add a new line to the textValue
    setShallowIdle(idle);
  }, [idle])

  useDidUpdate(() => {
    setTimeSinceLastInput(0);
    interval.start();
    return interval.stop;
  }, [textValue])

  return (
    <div
      className="h-full w-full flex flex-col"
    >
      <div
        className='h-12 w-full border border-gray-500 flex flex-row items-center justify-between'
      >
        <h1>DevLog</h1>
        {idle ? <span>Idle</span> : <span>Active</span>}
        {timeSinceLastInput}
        <FullScreenToggle />
      </div>

      <textarea
        className="h-full w-full"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
    </div>
  )
}