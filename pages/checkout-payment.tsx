import Head from "next/head";
import Footer from "../components/Footer";
import PaymentForm from "../components/PaymentForm";
import { GetServerSidePropsContext, NextPage } from "next";
import CartSummary from "../components/CartSummary";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { redirectError } from "../utils/utils";
import { SessionData } from "../types";

type PaymentProps = {
  clientSecret: string;
  sessionData: SessionData;
};
const Payment: NextPage<PaymentProps> = ({ clientSecret, sessionData }) => {
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!context.req.cookies.reactRoadMap) throw Error("cookie not set");
  const cookie = JSON.parse(context.req.cookies.reactRoadMap);
  const quantity = cookie.quantity;
  try {
    const res = await axios.post(
      `${process.env.NEXT_SERVER_BASE_URL}/api/paymentIntent`,
      { quantity }
    );

    return {
      props: {
        clientSecret: res.data?.client_secret,
        sessionData: cookie,
      },
    };
  } catch (error) {
    return redirectError(error);
  }
};

export default Payment;
