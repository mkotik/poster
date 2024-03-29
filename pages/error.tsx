import { GetServerSidePropsContext, NextPage } from "next";
import { Space_Grotesk } from "next/font/google";
import Head from "next/head";
import { readJWT } from "../utils/utils";

interface CustomError {
  error: Error;
  iat: number;
}

const spaceGrotesk = Space_Grotesk({
  weight: "400",
  subsets: ["latin"],
});

const spaceGroteskBig = Space_Grotesk({
  weight: "600",
  subsets: ["latin"],
});

const Error: NextPage<{ data: CustomError | string }> = ({ data }) => {
  if (data) console.log(data);
  return (
    <>
      <Head>
        <title>React Developer Roadmap - Error</title>
        <meta name="error" content="An unexpected error has occurred" />
      </Head>
      <div
        className={`flex flex-col items-center justify-center w-full ${spaceGroteskBig.className}`}
      >
        <span className="mt-20 text-3xl w-200">Something went wrong...</span>
        <span className={`mt-5 w-200 ${spaceGrotesk.className}`}>
          Please report the issue to{" "}
          <a className="hover:text-violet-500" href="mailto:mkotik97@gmail.com">
            mkotik97@gmail.com
          </a>
        </span>
      </div>
    </>
  );
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { token } = context.query;
  let payload;
  if (token && typeof token == "string") {
    payload = readJWT(token);
  }
  if (payload) {
    return {
      props: {
        data: payload,
      },
    };
  } else {
    return {
      props: {
        data: "No Error object passed",
      },
    };
  }
};

export default Error;
