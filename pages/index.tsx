import Head from "next/head";
import { NextPage } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";

const Home: NextPage = () => {
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
      <main>
        <MainContent />
        <Footer />
      </main>
    </>
  );
};

export default Home;
