import { GetServerSidePropsContext, NextPage } from "next";
import Footer from "../components/Footer";
import CheckoutForm from "../components/CheckoutForm";
import CartSummary from "../components/CartSummary";
import Head from "next/head";
import { redirectError } from "../utils/utils";

const Order: NextPage<{ quantity: number }> = ({ quantity }) => {
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
          <CheckoutForm quantity={quantity} />
        </div>
        <Footer />
      </main>
    </>
  );
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  try {
    if (!context.req.cookies.reactRoadMap)
      throw Error("cookie not set on /checkout-information");
    const cookie = JSON.parse(context.req.cookies.reactRoadMap);
    return {
      props: {
        quantity: cookie.quantity,
      },
    };
  } catch (err) {
    return redirectError(err);
  }
};

export default Order;
