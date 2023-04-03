import Head from "next/head";
import Footer from "../components/Footer";
import PaymentForm from "../components/PaymentForm";
import { NextPage } from "next";
import CartSummary from "../components/CartSummary";
import { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { redirectError } from "../utils/utils";
import Cookies from "js-cookie";
import { SessionData } from "../types";

const Payment: NextPage<{ clientSecret: string }> = ({ clientSecret }) => {
  const [sessionData, setSessionData] = useState<SessionData>({
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    specialNotes: "",
    quantity: 0,
    country: "",
    state: "",
  });
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

  useEffect(() => {
    if (Cookies.get("reactRoadMapCart")) {
      const sessionData = JSON.parse(Cookies.get("reactRoadMapCart")!);
      setSessionData(sessionData);
    }
  }, []);
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
          <CartSummary className="mb-2" quantity={sessionData.quantity} />
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, loader: "always" }}
          >
            <PaymentForm
              clientSecret={clientSecret}
              sessionData={sessionData}
            />
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
