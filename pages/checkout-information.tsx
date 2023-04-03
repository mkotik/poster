import { useRouter } from "next/router";
import { NextPage } from "next";
import { useState } from "react";
import Footer from "../components/Footer";
import CheckoutForm from "../components/CheckoutForm";
import CartSummary from "../components/CartSummary";
import Head from "next/head";

const Order: NextPage = () => {
  const router = useRouter();
  const [count, setCount] = useState<number>(Number(router.query.count) || 1);

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
      <main className="flex flex-col m-auto  w-full sm:w-[500px] px-2  bg-stone-100">
        <div className="pb-14">
          <CartSummary className="mb-2" count={count} setCount={setCount} />
          <CheckoutForm />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Order;
