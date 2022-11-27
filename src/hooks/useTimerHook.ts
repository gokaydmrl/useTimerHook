import { useState, useEffect } from "react";

const useTimerHook = ({
  duration,
  onExpireFunction,
}: {
  duration: number;
  onExpireFunction: () => void;
}) => {
  const [time, setTime] = useState<number>(duration);
  const [counts, setCounts] = useState<boolean>(false);
  const minutes: number = Math.floor(time / 60);
  const seconds: number | string = time % 60 < 10 ? `0${time % 60}` : time % 60;

  console.log("minutes", minutes, "seconds", seconds);

  type func = () => void;

  const pause: func = () => {
    setCounts(false);
  };

  const start: func = () => {
    setCounts(true);
  };

  const restart = (restartDuration: number) => {
    setTime(restartDuration);
    start();
  };

  const resume: func = () => {
    start();
  };

  useEffect(() => {
    console.log("effect worked");

    if (time < 1) {
      onExpireFunction();
      return;
    }

    if (counts) {
      const intervalID: number /*NodeJS timer */ = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);

      return () => {
        console.log("return worked");

        clearInterval(intervalID);
      };
    }
  }, [time, counts, onExpireFunction]);

  return {
    time,
    counts,
    start,
    pause,
    minutes,
    seconds,
    restart,
    resume,
  };
};
export default useTimerHook;
