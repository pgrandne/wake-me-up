import { useState } from "react"
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { ABI_WakeMeUp, goerliContract } from '../lib';
import { SelectTime } from "./SelectTime";

export const CardSettings = () => {
    const [scheduleWeek, setScheduleWeek] = useState({
        wakeupHour: 7,
        wakeupMinute: 0,
    })

    const [scheduleWeekend, setScheduleWeekend] = useState({
        wakeupHour: 10,
        wakeupMinute: 0
    })

    const { config, error } = usePrepareContractWrite({
        address: goerliContract,
        abi: ABI_WakeMeUp,
        functionName: 'scheduleWakeup',
        args: [scheduleWeek.wakeupHour, scheduleWeek.wakeupMinute, scheduleWeekend.wakeupHour, scheduleWeekend.wakeupMinute],
    })
    const { write } = useContractWrite(config)

    return (
        <div className="container flex mx-auto my-auto w-full items-center justify-center">
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
                <li
                    className="border-gray-400 flex flex-row mb-2"
                    onClick={() => write?.()}
                >
                    <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 justify-center items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                        <div className="font-medium text-center">Submit</div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
