import { CardClaim } from '.';
import { useContractRead, useContractWrite } from 'wagmi'
import { ABI_WakeMeUp } from '../lib';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SelectTime } from "./SelectTime";
import { waitForTransaction } from '@wagmi/core'

export const CardSettings = ({ account, update, setUpdate, contractAddress }: {
    account: `0x${string}` | undefined
    update: boolean
    setUpdate: Dispatch<SetStateAction<boolean>>
    contractAddress: `0x${string}`
}) => {

    const [loading, setLoading] = useState(false)
    const [schedule, setSchedule] = useState({
        wakeupWeekHour: 0,
        wakeupWeekMinute: 0,
        wakeupWeekendHour: 0,
        wakeupWeekendMinute: 0
    })

    const [scheduleWeek, setScheduleWeek] = useState({
        wakeupHour: 7,
        wakeupMinute: 0,
    })

    const [scheduleWeekend, setScheduleWeekend] = useState({
        wakeupHour: 10,
        wakeupMinute: 0
    })

    const { write } = useContractWrite({
        address: contractAddress,
        abi: ABI_WakeMeUp,
        functionName: 'scheduleWakeup',
        args: [scheduleWeek.wakeupHour, scheduleWeek.wakeupMinute, scheduleWeekend.wakeupHour, scheduleWeekend.wakeupMinute],
        onSuccess(data) {
            waitForSchedule(data.hash)
        },
        onError() {
            setLoading(false)
        }
    })

    const waitForSchedule = async (hash: any) => {
        const data = await waitForTransaction({
            hash,
        })
        setUpdate(!update)
        setLoading(false)
    }

    const [claim, setClaim] = useState(false)

    const checkSchedule = () => {
        if (schedule.wakeupWeekHour === 0 && schedule.wakeupWeekMinute === 0 && schedule.wakeupWeekendHour === 0 && schedule.wakeupWeekendMinute === 0)
            setClaim(false)
        else
            setClaim(true)
    }

    const { isError } = useContractRead({
        address: contractAddress,
        abi: ABI_WakeMeUp,
        functionName: 'getWakeupSchedule',
        args: [account],
        onSuccess(data: any) {
            setSchedule(data)
        },
    })

    useEffect(() => {
        checkSchedule()
    }, [schedule]);

    return (
        <>
            {!claim && <div className="card">
                <ul className="flex flex-col bg-gray-300 p-4">
                    <li className="border-gray-400 flex flex-row mb-2">
                        <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                            <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">📖</div>
                            <div className="flex-1 pl-1 mr-16">
                                <div className="font-medium">Week</div>
                                <div className="text-gray-600 text-sm">Wake Up before:</div>
                            </div>
                            <SelectTime schedule={scheduleWeek} setSchedule={setScheduleWeek} />
                        </div>
                    </li>
                    <li className="border-gray-400 flex flex-row mb-2">
                        <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                            <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">😎</div>
                            <div className="flex-1 pl-1 mr-16">
                                <div className="font-medium">Weekend</div>
                                <div className="text-gray-600 text-sm">Wake Up before:</div>
                            </div>
                            <SelectTime schedule={scheduleWeekend} setSchedule={setScheduleWeekend} />
                        </div>
                    </li>
                    {!loading && <li
                        className="border-gray-400 flex flex-row mb-2"
                        onClick={() => {
                            setLoading(true)
                            write?.()
                        }}
                    >
                        <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 justify-center items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                            <div className="font-medium text-center">Submit</div>
                        </div>
                    </li>}
                    {loading &&
                        <svg
                            className="animate-spin ml-44 mr-3 h-5 w-5 text-white"
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
                        </svg>
                    }
                </ul>
            </div>}
            {claim && <CardClaim account={account} update={update} setUpdate={setUpdate} contractAddress={contractAddress} />}
        </>
    )
}
