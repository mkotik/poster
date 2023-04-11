import React, { useState } from "react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { SessionData } from "../types";
import { Base64 } from "js-base64";
import { InfinitySpin } from "react-loader-spinner";

type PaymentFormProps = {
  clientSecret: string;
  sessionData: SessionData;
};

const PaymentForm: React.FC<PaymentFormProps> = ({
  clientSecret,
  sessionData,
}) => {
  const {
    address1,
    address2,
    city,
    country,
    email,
    firstName,
    lastName,
    phoneNumber,
    quantity,
    specialNotes,
    zipCode,
    state,
  } = sessionData;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  console.log(
    address1,
    address2,
    city,
    country,
    email,
    firstName,
    lastName,
    phoneNumber,
    quantity,
    specialNotes,
    zipCode,
    state
  );
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!stripe || !elements) return;

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            address: {
              city,
              country,
              line1: address1,
              line2: address2,
              postal_code: zipCode,
              state,
            },
            email,
            phone: phoneNumber,
            name: `${firstName} ${lastName}`,
          },
          // metadata: {
          //   // quantity,
          //   // specialNotes,
          //   name: "marat",
          //   quantity: 2,
          // },
        },
        receipt_email: email,
        return_url: "https://poster-delta.vercel.app/",
        shipping: {
          address: {
            city,
            country,
            line1: address1,
            line2: address2,
            postal_code: zipCode,
            state,
          },
          name: `${firstName} ${lastName}`,
          phone: phoneNumber,
        },
      });
      console.log(paymentIntent);
      if (!paymentIntent) throw Error("payment intent creation unsuccessful");

      if (paymentIntent.status === "succeeded") {
        // const token = createJWT(paymentIntent);
        const token = Base64.encode(JSON.stringify(paymentIntent));
        console.log(token);
        router.push(`/confirmation?token=${token}`);
      }
      // use webhook to handle post payment events https://stripe.com/docs/payments/quickstart?client=next&lang=node
      // const res = await axios.post("/api/submitPayment", { paymentIntent });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  const handleBack = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/checkout-information");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
      {isLoading && (
        <div className="flex justify-center">
          <InfinitySpin />
        </div>
      )}
    </>
  );
};

export default PaymentForm;
