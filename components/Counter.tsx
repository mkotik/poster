import React, { Dispatch, SetStateAction } from "react";

interface CounterProps {
  count: number;
  setCount?: Dispatch<SetStateAction<number>>;
}

const Counter: React.FC<CounterProps> = ({ count, setCount }) => {
  const increment = () => {
    if (setCount && count < 999) {
      setCount(() => count + 1);
    }
  };

  const decrement = () => {
    if (setCount && count > 1) {
      setCount(() => count - 1);
    }
  };
  return (
    <div className="flex">
      {setCount && (
        <div
          className="flex items-center justify-center w-10 h-10 transition border rounded cursor-pointer hover:bg-slate-200 active:bg-slate-300"
          onClick={decrement}
        >
          -
        </div>
      )}
      <div className="flex items-center justify-center w-10 h-10 mx-1 rounded bg-slate-200">
        <div>{count}</div>
      </div>
      {setCount && (
        <div
          className="flex items-center justify-center w-10 h-10 transition border rounded cursor-pointer hover:bg-blue-300 active:bg-blue-400 hover:cursor"
          onClick={increment}
        >
          +
        </div>
      )}
    </div>
  );
};

export default Counter;
