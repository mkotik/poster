import Head from "next/head";
import Footer from "../components/Footer";
import PaymentForm from "../components/PaymentForm";
import { NextPage } from "next";
import CartSummary from "../components/CartSummary";
import { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { redirectError } from "../utils/utils";

const Payment: NextPage<{ clientSecret: string }> = ({ clientSecret }) => {
  const [count, setCount] = useState(0);
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

  return (
    <>
      <Head>
        <title>React Developer Roadmap</title>
        <meta
          name="description"
          content="Perfect for the self-taught React & Javascript Developer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col m-auto  w-full sm:w-[500px] px-2  bg-stone-100 ">
        <div className="pb-14">
          <CartSummary className="mb-2" count={2} setCount={setCount} />
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, loader: "always" }}
          >
            <PaymentForm clientSecret={clientSecret} />
          </Elements>
        </div>
        <Footer />
      </main>
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_SERVER_BASE_URL}/api/paymentIntent`
    );

    return {
      props: {
        clientSecret: res.data?.client_secret,
      },
    };
  } catch (error) {
    return redirectError(error);
  }
};

export default Payment;
