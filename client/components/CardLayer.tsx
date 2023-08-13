import { Card, CardDeposit } from '../components';
import { useContractRead } from 'wagmi'
import { ABI_WakeMeUp, goerliContract } from '../lib';
import { useEffect, useState } from 'react';

export const CardLayer = ({ account }: { account: `0x${string}` }) => {

    const [balance, setBalance] = useState(0)
    const [update, setUpdate] = useState(false)

    useEffect(() => { }, [update])

    const { data, isError, isLoading } = useContractRead({
        address: goerliContract,
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
                <CardDeposit setBalance={setBalance} update={update} setUpdate={setUpdate} />
            }
            {balance >= 5000000000000000 &&
                <Card account={account} update={update} setUpdate={setUpdate} />
            }
        </>
    )
}