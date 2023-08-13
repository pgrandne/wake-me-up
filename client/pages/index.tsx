import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { CardLayer } from '../components';
import { useAccount } from 'wagmi';
import { logo, github } from '../lib';
import Image from 'next/image'

const Home: NextPage = () => {
  const { address, isConnected } = useAccount()

  return (
    <div className="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
      <Head>
        <title>Wake Me Up!</title>
        <meta
          content="Wake Me Up!"
          name="Wake Me Up!"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className="w-screen h-screen">
        <div className="absolute top-1 md:top-2 left-1 md:left-2">
          <Image
            width={200}
            height={200}
            src={logo}
            alt="logo Wake Me Up!"
          />
        </div>
        <div className="absolute top-1 md:top-2 right-1 md:right-2">
          <ConnectButton />
        </div>
        <div className="h-1/6 flex justify-center">

          <h1 className="my-auto  text-5xl">
            Wake Me Up!
          </h1>
        </div>
        <div className="h-4/6 my-auto">
          {isConnected && <CardLayer account={address!} />}
          {!isConnected && <div className="card">Please connect</div>}
        </div>
        <div className="mt-5 mb-3 w-full flex justify-center gap">
          <a
            href="https://github.com/pgrandne/wake-me-up"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              className="h-8 object-contain cursor-pointer hover:opacity-100"
              src={github}
              alt="github"
            />
          </a>
        </div>
      </main >
    </div >
  );
};

export default Home;
