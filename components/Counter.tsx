import React, { Dispatch, SetStateAction } from "react";

interface CounterProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const Counter: React.FC<CounterProps> = ({ count, setCount }) => {
  const increment = () => {
    if (count < 999) setCount(() => count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(() => count - 1);
  };
  return (
    <div className="flex">
      <div
        className="border transition cursor-pointer rounded w-10 h-10 flex justify-center items-center hover:bg-slate-200 active:bg-slate-300"
        onClick={decrement}
      >
        -
      </div>
      <div className=" mx-1 rounded flex w-10 h-10 justify-center items-center bg-slate-200">
        <div>{count}</div>
      </div>
      <div
        className="border transition cursor-pointer rounded w-10 h-10 flex justify-center items-center hover:bg-blue-300 active:bg-blue-400 hover:cursor"
        onClick={increment}
      >
        +
      </div>
    </div>
  );
};

export default Counter;
