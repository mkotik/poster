import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const PaymentForm: React.FC<any> = () => {
  const [clientSecret, setClientSecret] = useState(undefined);
  const router = useRouter();
  const handleSubmit = () => null;
  const handleBack = () => {
    router.push("/checkout-information");
  };

  const options = { clientSecret };
  useEffect(() => {
    axios
      .get(`${window.location.origin}/api/paymentIntent`)
      .then((res) => {
        setClientSecret(res.data.client_secret);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label className="flex flex-col mb-4">
        Contact Information
        <input placeholder="Email" />
      </label>
      {options.clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentElement />
        </Elements>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log(process.env.NEXT_PUBLIC_NAME);
        }}
      >
        here
      </button>
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="px-3 py-2 transition rounded hover:bg-slate-300"
        >
          Back
        </button>
        <button
          className="px-3 py-2 transition bg-green-300 rounded hover:bg-green-400"
          type="submit"
        >
          Continue to Shipping
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
