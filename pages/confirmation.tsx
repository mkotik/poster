import Head from "next/head";
import { GetServerSidePropsContext, NextPage } from "next";
import { Base64 } from "js-base64";
import { PaymentIntent } from "@stripe/stripe-js";
import Footer from "../components/Footer";

type ConfirmationProps = {
  data: PaymentIntent;
};
const Confirmation: NextPage<ConfirmationProps> = ({ data }) => {
  console.log(data);
  return (
    <>
      <Head>
        <title>React Developer Roadmap - Confirmation</title>
        <meta
          name="description"
          content="Your React Developer Roadmap order has been placed"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col m-auto  w-full sm:w-[500px] px-2  bg-stone-100 ">
        <div className="min-h-screen pb-14">
          <h3 className="mt-5 text-2xl font-semibold text-center">
            Order Confirmed
          </h3>
          <div className="flex justify-between px-2 py-3 mt-5 bg-slate-200">
            <p className="font-light">{data.description}</p>
            <p className="font-light">{`$${(data.amount / 100).toFixed(2)}`}</p>
          </div>
          <p className="mt-5 font-medium text-center">
            {` Order confirmation has been sent to ${data.receipt_email}`}
          </p>
          <p className="mt-16 font-medium text-center ">Happy Coding!</p>
        </div>
        <Footer />
      </main>
    </>
  );
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { token } = context.query;
  let data;
  if (typeof token === "string") {
    const decodedJsonString = Base64.decode(token);
    data = JSON.parse(decodedJsonString);
  }

  return {
    props: {
      data,
    },
  };
};

export default Confirmation;
