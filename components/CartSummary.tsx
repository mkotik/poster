const CartSummary: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <h2>Cart Summary</h2>
      <div>
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>$0.00</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>N/A</p>
        </div>
        <div className="flex justify-between">
          <p>Taxes</p>
          <p>$0.00</p>
        </div>
        <div className="flex justify-between">
          <p>Total</p>
          <p>$0.00</p>
        </div>
      </div>
      <div>
        <div className="flex">
          <p className="w-20">Contact: </p>
          <p>mkotik97@gmail.com</p>
        </div>
        <div className="flex">
          <p className="w-20">Ship To: </p>
          <p>mkotik97@gmail.com</p>
        </div>
        <div className="flex">
          <p className="w-20">Notes: </p>
          <p>mkotik97@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
