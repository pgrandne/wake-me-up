import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { ABI_WakeMeUp } from '../lib';
import { Dispatch, SetStateAction } from 'react';
import { waitForTransaction } from '@wagmi/core'
import { toast } from 'react-toastify';

export const ClaimButton = ({ setValidated, update, setUpdate, contractAddress }: {
    setValidated: Dispatch<SetStateAction<boolean>>
    update: boolean
    setUpdate: Dispatch<SetStateAction<boolean>>
    contractAddress: `0x${string}`
}) => {
    const { config, error } = usePrepareContractWrite({
        address: contractAddress,
        abi: ABI_WakeMeUp,
        functionName: 'claim',
    })

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: contractAddress,
        abi: ABI_WakeMeUp,
        functionName: 'claim',
        onSuccess(data) {
            notifyRequest()
            waitForClaim(data.hash)
        }
    })

    const waitForClaim = async (hash: any) => {
        const data = await waitForTransaction({
            hash,
        })
        setUpdate(!update)
        setValidated(false)
        notifyClaimed()
    }

    const notifyRequest = () => toast("🦄 Request Submitted !");
    const notifyClaimed = () => toast("🦄 Claimed!");

    return (
        <div className="border-gray-400 flex flex-row mb-2">
            <div
                className=" mt-5 select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                onClick={() => write?.()}
            >
                <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">💵</div>
                <div className="flex-1 pl-1 mr-16">
                    {!isLoading && <div className="font-medium">Claim 0.005 eth</div>}
                    {isLoading && <svg
                        className="animate-spin ml-4 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="black"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="blue"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>}
                </div>
            </div>
        </div>

    )
}

