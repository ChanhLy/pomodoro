import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const format = 'mm:ss';
const workTime = dayjs('2000-00-00 00:25:00', 'YYYY-MM-DD HH:mm:ss');
const restTime = dayjs('2000-00-00 00:05:00', 'YYYY-MM-DD HH:mm:ss');
const nullTime = dayjs('2000-00-00 00:00:00', 'YYYY-MM-DD HH:mm:ss');

interface Props { }

export const Timer: React.FC = (props: Props) => {
  const [value, setValue] = useState(workTime);
  const [isCounting, setIsCounting] = useState(false);
  const [isWorking, setIsWorking] = useState(true);

  useEffect(() => {
    let timer: number | undefined;
    if (isCounting) {
      timer = window.setInterval(() => {
        setValue(value => value.subtract(1, 'second'));
      }, 1000);
    }
    return () => {
      window.clearInterval(timer);
    };
  }, [isCounting]);

  useEffect(() => {
    if (value === nullTime) {
      setIsWorking(isWorking => !isWorking);
    }
  }, [value])

  useEffect(() => {
    return isWorking ? setValue(workTime) : setValue(restTime);
  }, [isWorking])

  return (
    <>
      <div>
        {value.format(format)}
        <button onClick={onAddMinutes}>+</button>
      </div>
      <button onClick={onStartCounter} hidden={isCounting}>
        Start
      </button>
      <button onClick={onStopCounter} hidden={!isCounting}>
        Stop
      </button>
      <button onClick={onNullTimer}>End Timer</button>
    </>
  );

  function onAddMinutes(event: React.MouseEvent) {
    event.preventDefault();
    setValue(value.add(5, 'minute'));
  }
  function onStartCounter(event: React.MouseEvent) {
    event.preventDefault();
    setIsCounting(true);
  }
  function onStopCounter(event: React.MouseEvent) {
    event.preventDefault();
    setIsCounting(false);
  }
  function onNullTimer(event: React.MouseEvent) {
    event.preventDefault();
    setIsWorking(!isWorking);
    setIsCounting(false);
  }

};
