import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'
import { waitForTransaction } from '@wagmi/core'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify';

export const CardDeposit = ({ setBalance, update, setUpdate, contractAddress }: {
    setBalance: Dispatch<SetStateAction<number>>
    update: boolean
    setUpdate: Dispatch<SetStateAction<boolean>>
    contractAddress: string
}) => {
    const [loading, setLoading] = useState(false)
    const { data, sendTransaction } = useSendTransaction({
        to: contractAddress,
        value: parseEther('0.05'),
        onSuccess(data) {
            notifyDeposit()
            waitForDeposit(data.hash)
        },
        onError(data) {
            setLoading(false)
        }
    })

    const waitForDeposit = async (hash: any) => {
        const data = await waitForTransaction({
            hash,
        })
        setBalance(5000000000000000)
        setUpdate(!update)
        setLoading(false)
        notifyConfirmed()
    }

    const notifyDeposit = () => toast("🦄 Deposit Submitted !");
    const notifyConfirmed = () => toast("🦄 Deposit Confirmed!");

    return (
        <div className="card">
            <div className="flex flex-col bg-gray-300 p-4">
                <p className="font-medium text-center">You have to deposit 0.05 eth (~$90)</p>
                <p className="font-medium text-center">to wake up 10 times:</p>
                <p className="font-medium text-center">you will receive 0.005 eth per day</p>
                <div className="border-gray-400 flex flex-row mb-2">
                    <div
                        className=" mt-5 select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                        onClick={() => {
                            setLoading(true)
                            sendTransaction()
                        }}
                    >
                        <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">💸</div>
                        <div className="flex-1 pl-1 mr-16">
                            {!loading && <div className="font-medium">Deposit 0.05 eth</div>}
                            {loading && <svg
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
            </div>
        </div >
    )
}
