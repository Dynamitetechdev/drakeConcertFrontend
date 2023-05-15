import Head from "next/head";
import HomePage from "./home";
export default function Home() {
  return (
    <>
      <Head>
        <title>Secure Chain Document Registry</title>
        <meta
          name="description"
          content="the ultimate solution for storing your valuable documents and files on the blockchain network."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mainPage">
        <HomePage />
      </div>
    </>
  );
}
