import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
const workTime = 25 * 60;
const restTime = 5 * 60;
const nullTime = 0;

interface Props {}

export const Timer: React.FC = (props: Props) => {
  const [value, setValue] = useState(workTime);
  const [isCounting, setIsCounting] = useState(false);
  const [isWorking, setIsWorking] = useState(true);

  useEffect(() => {
    let timer: number | undefined;
    if (isCounting) {
      timer = window.setInterval(() => {
        setValue((value) => value - 1);
      }, 1000);
    }
    return () => {
      window.clearInterval(timer);
    };
  }, [isCounting]);

  useEffect(() => {
    if (value === nullTime) {
      setIsWorking((isWorking) => !isWorking);
    }
  }, [value]);

  useEffect(() => {
    return isWorking ? setValue(workTime) : setValue(restTime);
  }, [isWorking]);

  return (
    <>
      <div>
        {parseTime(value)}
        <Button onClick={onAddMinutes} size='large' type='primary'>
          +
        </Button>
      </div>
      <Button
        onClick={onStartCounter}
        hidden={isCounting}
        size='large'
        type='primary'
      >
        Start
      </Button>
      <Button
        onClick={onStopCounter}
        hidden={!isCounting}
        size='large'
        type='default'
      >
        Stop
      </Button>
      <Button onClick={onNullTimer} size='large' type='primary'>
        End Timer
      </Button>
    </>
  );

  function onAddMinutes(event: React.MouseEvent) {
    event.preventDefault();
    setValue(value + 5 * 60);
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

function parseTime(value: number) {
  const minutes = value / 60;
  const seconds = value % 60;
  return `${Math.floor(minutes)}:${seconds < 10 ? '0' + seconds : seconds}`;
}
