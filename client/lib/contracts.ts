const optimismGoerli = "0x47579267a80115b0fBc7b4FF35Cef538738dD036"
const baseGoerli = "0x6925A6A9b4e73769734F4644DE07169FBC5f0C57"
const modeGoerli = "0xb577ED8dB5a965815b53d5141A83D1DEed438DBC"

export const getContractAddress = (chainId:number|undefined) => {
    switch (chainId) {
        case 420:
            return optimismGoerli

        case 919:
            return modeGoerli

        case 84531:
            return baseGoerli

        default:
              return optimismGoerli
    }
}




// export const goerliContract = "0x8D31e985e22602D3D51135101F9E75612752a6ca"



export const goerliContract = "0xb577ED8dB5a965815b53d5141A83D1DEed438DBC"

