import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { CardLayer, ModalInfo } from '../components';
import { useAccount, useNetwork } from 'wagmi';
import { switchNetwork } from '@wagmi/core'
import { logo, github, info } from '../lib';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home: NextPage = () => {
  const [connected, setConnected] = useState(false)
  const [modalInfo, setModalInfo] = useState(false)
  const { chain } = useNetwork()

  const network = async () => {
    if (chain && chain!.id !== 420 && chain!.id !== 919 && chain!.id !== 84531)
      await switchNetwork({ chainId: 420, })
  }

  const { address, isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) {
      network()
      setConnected(true)
    }
  }, [isConnected, chain])

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
        <div className="absolute top-1 md:top-2 right-1 md:right-2" suppressHydrationWarning>
          <ConnectButton />
        </div>
        <div className="h-1/6 flex justify-center">
          <h1 className="mt-20 text-indigo-500 my-auto text-5xl font-bold">
            Wake Me Up!
          </h1>
        </div>
        <div className="h-4/6 my-auto" suppressHydrationWarning>
          {connected && <CardLayer account={address!} />}
          {!connected && <div className="card">Please connect</div>}
        </div>
        <div className="mt-5 mb-3 w-full flex justify-center gap">
          <a
            href="https://github.com/pgrandne/wake-me-up"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              className="h-8 object-contain cursor-pointer opacity-70 hover:opacity-100"
              src={github}
              alt="github"
            />
          </a>
          <div
            onClick={() => {
              setModalInfo(true)
            }}>
            <Image
              className="h-8 object-contain cursor-pointer opacity-70 hover:opacity-100"
              src={info}
              alt="Info"
            />
          </div>
        </div>
        {modalInfo && <ModalInfo setModalInfo={setModalInfo} />}
      </main >
      <ToastContainer position="bottom-right" />
    </div >
  );
};

export default Home;
