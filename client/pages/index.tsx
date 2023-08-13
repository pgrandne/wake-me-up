import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Card, CardDeposit } from '../components';
import { useContractRead } from 'wagmi'
import { ABI_WakeMeUp, goerliContract } from '../lib';
import { getAccount } from '@wagmi/core'
import { useState } from 'react';

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const account = getAccount()
  const { data, isError, isLoading } = useContractRead({
    address: goerliContract,
    abi: ABI_WakeMeUp,
    functionName: 'balanceOfAccount',
    args: [account.address],
    onSuccess(data: BigInt) {
      setBalance(Number(data))
    },
  })

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
        <div className="absolute top-1 md:top-2 right-1 md:right-2">
          <ConnectButton />
        </div>
        <div className="h-1/6 flex justify-center">
          <h1 className="my-auto text-xl">
            Wake Me Up!
          </h1>
        </div>
        <div className="h-4/6 my-auto">
          {balance < 5000000000000000 && <CardDeposit />}
          {balance >= 5000000000000000 && <Card account={account.address} />}
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
