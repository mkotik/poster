import React from "react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm: React.FC<{ clientSecret: string }> = ({ clientSecret }) => {
  //TODO
  // Style card input better https://stripe.com/docs/payments/quickstart?client=next&lang=node
  // pass in correct data to paymentIntent
  // handle post payment events
  // error handling and validation
  // get this to work in prod
  // fix UI on mobile
  // watermark picture
  // Loader for payment
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(stripe);
    console.log(elements);
    if (!stripe || !elements) return;

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: "Jenny Rosenn",
          },
        },
        receipt_email: "mkotik97@gmail.com",
        return_url: "http://localhost:3000/",
      });
      console.log(paymentIntent);
      if (!paymentIntent) throw Error("payment intent creation unsuccessful");
      // use webhook to handle post payment events https://stripe.com/docs/payments/quickstart?client=next&lang=node
      // const res = await axios.post("/api/submitPayment", { paymentIntent });
    } catch (err) {
      console.log(err);
    }
  };
  const handleBack = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/checkout-information");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="flex flex-col mb-4">
        Contact Information
        <input placeholder="Email" />
      </label>

      <CardElement />
      <div className="flex justify-between mt-6">
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
