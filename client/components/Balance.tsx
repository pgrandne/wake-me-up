import { useContractRead } from 'wagmi'
import { ABI_WakeMeUp, goerliContract } from '../lib';
import { useState } from 'react';
import { formatEther } from 'viem'

export const Balance = ({ account }: { account: `0x${string}` | undefined; }) => {
    const [balance, setBalance] = useState("0")
    const { data, isError, isLoading } = useContractRead({
        address: goerliContract,
        abi: ABI_WakeMeUp,
        functionName: 'balanceOfAccount',
        args: [account],
        onSuccess(data: bigint) {
            setBalance(formatEther(data))
        },
    })

    const balanceColor = () => {
        if (Number(balance) > 0.005)
            return "text-green-600"
        else if (Number(balance) === 0.005)
            return "text-orange-600"
        else
            return "text-red-600"
    }

    return (
        <>
            <p className="font-medium text-right">Balance: <span className={balanceColor()}>{balance} eth</span></p>
            <p className="font-medium text-right">Wake Up Remaining: <span className={balanceColor()}>{Number(balance) / 0.005}</span></p>
        </>
    )
}