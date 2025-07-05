"use client";
import useAnimateCounter from "@/hooks/useAnimateCounter";
import { convertToPersianDigits } from "@/utilities/convertToPersianDigits";

const AnimatedNumbers = ({ start = 0, end = 100, duration = 3000}) => {
  const count = useAnimateCounter(start, end, duration);

  return (
    <>
      <span>{convertToPersianDigits(count)}</span>
    </>
  );
};

export default AnimatedNumbers;
