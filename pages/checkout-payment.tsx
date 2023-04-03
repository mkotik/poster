import Head from "next/head";
import Footer from "../components/Footer";
import PaymentForm from "../components/PaymentForm";
import { NextPage } from "next";
import CartSummary from "../components/CartSummary";
import { useState } from "react";
import axios from "axios";
import { createJWT } from "../utils/utils";

const Payment: NextPage<{ clientSecret: string }> = ({ clientSecret }) => {
  const [count, setCount] = useState(0);

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
          <PaymentForm clientSecret={clientSecret} />
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
    const token = createJWT({
      error,
    });
    return {
      redirect: {
        destination: `/error?token=${token}`,
        statusCode: 302,
      },
    };
  }
};

export default Payment;
