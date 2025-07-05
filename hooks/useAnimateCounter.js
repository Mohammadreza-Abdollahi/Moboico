import { useState, useEffect } from "react";

export default function useAnimateCounter(
  start = 0,
  end = 100,
  duration = 2000
) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.round(start + range * progress);
      setValue(currentValue);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }, [start, end, duration]);

  return value;
}
