# Wake Me Up for Superhack

Wake up every morning to get back your money, if you don't wake up, your money is sent to SBF!

This project helps you to wake up the morning: 
1. First you deposit some eth into a smart contract 
2. Then you define a wake up time for the week and the weekend
3. Every day if you wake up before this time, you can claim a part of your deposit, if not this money is sent to Sam Bankman-Fried from FTX 
4. If you wake up 10 times in a row before your defined time, you can mint a NFT as gift/proof

## Deployments
| Network               | Address                                          |
|-----------------------|--------------------------------------------------|
| Optimism Goerli |[0x47579267a80115b0fBc7b4FF35Cef538738dD036](https://goerli-optimism.etherscan.io/address/0x47579267a80115b0fBc7b4FF35Cef538738dD036) |
| Base Goerli |[0x6925A6A9b4e73769734F4644DE07169FBC5f0C57](https://goerli.basescan.org/address/0x6925A6A9b4e73769734F4644DE07169FBC5f0C57#code)  |
| Mode Goerli |0xb577ED8dB5a965815b53d5141A83D1DEed438DBC|
| Zora Goerli Testnet (NFT) | [0xff4f797212e7cd404c5d105e5af6d9d369c27915](https://testnet.explorer.zora.energy/address/0xff4f797212e7cd404c5d105e5af6d9d369c27915) |

## Instructions
##### Clone the project
Clone the repository on your local machine
```bash
$ git clone https://github.com/pgrandne/wake-me-up.git
```

### Front End ###
We use NextJS 13. The Front End scripts are in "client" folder.
If you want to launch the Front End locally:

1. Go to "wake-me-up" folder
```bash
$ cd wake-me-up
```

2. Install the dependencies
```bash
$ npm install
```

3. Launch the server locally
```bash
$ npm run dev
```

### Contracts ###
We use Hardhat. Contract and scripts are in "core" folder.

1. Go to "wake-me-up" folder if it is not already done
```bash
$ cd wake-me-up
```

2. Install the dependencies
```bash
$ npm install
```
3. Rename the .env.example file to .env and complete the constants

