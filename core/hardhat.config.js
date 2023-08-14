// hardhat.config.js

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { API_URL, PRIVATE_KEY } = process.env;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "goerli",
  networks: {
      hardhat: {},
      goerli: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      },
      optimismGoerli: {
        url: API_URL,
        accounts: [`0x${PRIVATE_KEY}`]
      },
          // for testnet
      'base-goerli': {
        url: 'https://goerli.base.org',
        accounts: [`0x${PRIVATE_KEY}`],
        gasPrice: 1000000000,
      },
  },
  etherscan: {
    apiKey: {
      "base-goerli": "PLACEHOLDER_STRING"
     },
     customChains: [
       {
         network: "base-goerli",
         chainId: 84531,
         urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org"
         }
       }
     ]
  }
};
