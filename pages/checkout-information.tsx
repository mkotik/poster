import { NextPage } from "next";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import CheckoutForm from "../components/CheckoutForm";
import CartSummary from "../components/CartSummary";
import Head from "next/head";
import Cookies from "js-cookie";

const Order: NextPage = () => {
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    if (Cookies.get("reactRoadMapCart")) {
      const cartSummary = JSON.parse(Cookies.get("reactRoadMapCart")!);
      setQuantity(cartSummary.quantity);
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
      <main className="flex flex-col m-auto  w-full sm:w-[500px] px-2  bg-stone-100">
        <div className="pb-14">
          <CartSummary className="mb-2" quantity={quantity} />
          <CheckoutForm />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Order;
