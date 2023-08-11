import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Card } from '../components/Card';

const Home: NextPage = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
      <Head>
        <title>Arbitrage for Everyone</title>
        <meta
          content="Arbitrage for Everyone"
          name="Arbitrage for Everyone"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="w-screen h-screen">
        <div className="absolute top-2 right-3">
          <ConnectButton />
        </div>
        <div className="h-1/6 flex justify-center">
          <h1 className="my-auto text-xl">
            Wake Me Up!
          </h1>
        </div>
        <div className="h-4/6 my-auto">
          <Card />
        </div>
        <div className="h-1/6 text-center">
          <p className="my-auto">
            Footer
          </p>
        </div>

      </main>
    </div>
  );
};

export default Home;
