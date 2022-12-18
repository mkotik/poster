import { useRouter } from "next/router";
import Footer from "../components/Footer";
import CheckoutForm from "../components/CheckoutForm";
import CartSummary from "../components/CartSummary";
import Head from "next/head";

const Order: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };
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
      <main className="flex flex-col m-auto  w-full sm:w-[500px] px-2">
        <CartSummary className="mb-2" />
        <CheckoutForm />
        <Footer />
      </main>
    </>
  );
};

export default Order;
