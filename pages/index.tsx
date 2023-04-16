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
          content="A Succinct Visual Guide for React Developers"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="React Developer Roadmap" />
        <meta
          property="og:description"
          content="A Succinct Visual Guide for React Develoeprs"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.reactdeveloperroadmap.com/"
        />
        <meta property="og:image" content="/poster2.jpg" />
        <meta property="og:image:width" content="1250" />
        <meta property="og:image:height" content="834" />

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
