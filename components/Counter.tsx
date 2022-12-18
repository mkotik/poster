import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(1);

  const increment = () => {
    if (count < 999) {
      setCount((prevState) => prevState + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount((prevState) => prevState - 1);
    }
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
