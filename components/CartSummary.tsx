import Counter from "./Counter";
import React from "react";
import config from "../config";

interface CartSummaryProps {
  className?: string;
  quantity: number;
}
const CartSummary: React.FC<CartSummaryProps> = ({ className, quantity }) => {
  const subTotal = quantity * config.price;
  const taxes = subTotal * config.taxRate;
  const total = subTotal + taxes + config.shipping;
  return (
    <div className={className}>
      <h2 className="flex items-center h-8 px-2 mt-2 border-b-2 border-gray-500">
        Cart Summary:
      </h2>
      <div className="border-b-2 border-gray-500 ">
        <div className="flex items-center justify-between h-12 px-2 border-b border-gray-200 ">
          <p>24&quot; x 36&quot; Poster</p>
          <Counter count={quantity} />
        </div>
      </div>
      <div className="border-b-2 border-gray-500 ">
        <div className="flex items-center justify-between h-12 px-2 border-b border-gray-200 ">
          <p>Subtotal</p>
          <p>{`$${subTotal.toFixed(2)}`}</p>
        </div>
        <div className="flex items-center justify-between h-12 px-2 border-b border-gray-200">
          <p>Shipping</p>
          <p>{`$${config.shipping}`}</p>
        </div>
        <div className="flex items-center justify-between h-12 px-2 border-b border-gray-200">
          <p>Taxes</p>
          <p>{`$${taxes.toFixed(2)}`}</p>
        </div>
        <div className="flex items-center justify-between h-12 px-2 border-b border-gray-200">
          <p>Total</p>
          <p>{`$${total.toFixed(2)}`}</p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
