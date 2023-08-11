import 'tailwindcss/tailwind.css'
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  baseGoerli,
  optimismGoerli,
  zoraTestnet,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { modeTest } from './chains';
import { AppProps } from 'next/app';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    baseGoerli,
    modeTest,
    optimismGoerli,
    zoraTestnet,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Arbitrage for everyone',
  projectId: "fb7b2551fca10844d290c9ed6383747f",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;