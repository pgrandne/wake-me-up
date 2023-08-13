import { Balance, ClaimButton } from ".";
import { useContractRead } from 'wagmi'
import { ABI_WakeMeUp, goerliContract } from '../lib';
import { useState } from 'react';

export const CardClaim = ({ account }: { account: `0x${string}` | undefined; }) => {
    const [validated, setValidated] = useState(false)
    const { data, isError, isLoading } = useContractRead({
        address: goerliContract,
        abi: ABI_WakeMeUp,
        functionName: 'checkWithdraw',
        args: [account],
        onSuccess(data: boolean) {
            setValidated(data)
        },
    })

    return (
        <div className="container flex mx-auto my-auto w-full items-center justify-center">
            <div className="flex flex-col bg-gray-300 p-4">
                <Balance account={account} />
                {validated && <ClaimButton />}
                {!validated &&
                    <div className="border-gray-400 flex flex-row mb-2">
                        <div className=" mt-5 bg-red-400 rounded-md flex flex-1 items-center p-4">
                            <div className="flex flex-col rounded-md w-10 h-10 bg-white justify-center items-center mr-4">❌</div>
                            <div className="flex-1 pl-1 mr-16">
                                <div className="font-medium">You have already claimed today</div>
                                <div className="font-medium">or your balance is empty</div>
                            </div>
                        </div>
                    </div>}
            </div>
        </div >


    )
}