import { useEffect, useRef, useState } from "react";

export function useCountdown(initialSeconds, format = "minutes") {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return;

    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const reset = (newSeconds = initialSeconds) => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setSecondsLeft(newSeconds);
    setIsActive(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const value =
    format === "seconds"
      ? secondsLeft
      : `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(
          secondsLeft % 60
        ).padStart(2, "0")}`;

  return {
    value,
    secondsLeft,
    isActive,
    start,
    reset,
  };
}
