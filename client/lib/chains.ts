import { Chain } from 'wagmi'

export const modeTest = {
    id: 919,
    name: 'Mode Testnet',
    network: 'Mode Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://sepolia.mode.network/'] },
      default: { http: ['https://sepolia.mode.network/'] },
    },
    blockExplorers: {
      etherscan: { name: 'SepoliaExplorerMode', url: 'https://sepolia.explorer.mode.network/' },
      default: { name: 'SepoliaExplorerMode', url: 'https://sepolia.explorer.mode.network/' },
    },
  } as const satisfies Chain