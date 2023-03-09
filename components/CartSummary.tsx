import Counter from "./Counter";
import React, { Dispatch, SetStateAction } from "react";

interface CartSummaryProps {
  className?: string;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}
const CartSummary: React.FC<CartSummaryProps> = ({
  className,
  count,
  setCount,
}) => {
  return (
    <div className={className}>
      <h2 className="flex items-center h-8 px-2 mt-2 border-b-2 border-gray-500">
        Cart Summary:
      </h2>
      <div className="border-b-2 border-gray-500 ">
        <div className="flex items-center justify-between h-12 px-2 border-b border-gray-200 ">
          <p>24&quot x 36&quot Poster</p>
          <Counter count={count} setCount={setCount} />
        </div>
      </div>
      <div className="border-b-2 border-gray-500 ">
        <div className="flex items-center justify-between h-12 px-2 border-b border-gray-200 ">
          <p>Subtotal</p>
          <p>$0.00</p>
        </div>
        <div className="flex items-center justify-between h-12 px-2 border-b border-gray-200">
          <p>Shipping</p>
          <p>N/A</p>
        </div>
        <div className="flex items-center justify-between h-12 px-2 border-b border-gray-200">
          <p>Taxes</p>
          <p>$0.00</p>
        </div>
        <div className="flex items-center justify-between h-12 px-2 border-b border-gray-200">
          <p>Total</p>
          <p>$0.00</p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
