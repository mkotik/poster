import Head from "next/head";
import Footer from "../components/Footer";
import PaymentForm from "../components/PaymentForm";
import CartSummary from "../components/CartSummary";
import { useState } from "react";

const Payment: React.FC<any> = () => {
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
          <PaymentForm />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Payment;
