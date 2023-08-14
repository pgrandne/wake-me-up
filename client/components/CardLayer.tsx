import { CardDeposit, CardSettings } from '../components';
import { useContractRead, useNetwork } from 'wagmi'
import { ABI_WakeMeUp, getContractAddress } from '../lib';
import { useEffect, useState } from 'react';

export const CardLayer = ({ account }: { account: `0x${string}` }) => {

    const [balance, setBalance] = useState(0)
    const [update, setUpdate] = useState(false)
    const { chain } = useNetwork()
    const contractAddress = getContractAddress(chain?.id)

    useEffect(() => { }, [update])

    const { data, isError, isLoading } = useContractRead({
        address: contractAddress,
        abi: ABI_WakeMeUp,
        functionName: 'balanceOfAccount',
        args: [account],
        onSuccess(data: BigInt) {
            setBalance(Number(data))
        },
    })

    return (
        <>
            {balance < 5000000000000000 &&
                <CardDeposit setBalance={setBalance} update={update} setUpdate={setUpdate} contractAddress={contractAddress} />
            }
            {balance >= 5000000000000000 &&
                <CardSettings account={account} update={update} setUpdate={setUpdate} contractAddress={contractAddress} />
            }
        </>
    )
}