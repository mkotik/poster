import Head from "next/head";
import { GetServerSidePropsContext, NextPage } from "next";
import { Base64 } from "js-base64";
import { PaymentIntent } from "@stripe/stripe-js";

type ConfirmationProps = {
  data: PaymentIntent;
};
const Confirmation: NextPage<ConfirmationProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>React Developer Roadmap - Confirmation</title>
        <meta
          name="description"
          content="Perfect for the self-taught React & Javascript Developer"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>Order Confirmed</p>
        <p>{data.amount}</p>
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
