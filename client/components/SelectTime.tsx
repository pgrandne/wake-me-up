import { Dispatch, SetStateAction } from "react";

export const SelectTime = ({ schedule, setSchedule }: {
    schedule: { wakeupHour: number; wakeupMinute: number }
    setSchedule: Dispatch<SetStateAction<{ wakeupHour: number; wakeupMinute: number }>>
}) => {
    const hour = [
        { value: 5, text: "05" },
        { value: 6, text: "06" },
        { value: 7, text: "07" },
        { value: 8, text: "08" },
        { value: 9, text: "09" },
        { value: 10, text: "10" },
        { value: 11, text: "11" },
    ]

    const optionsHour = hour.map((option) => {
        return <option key={option.value} value={option.value}>{option.text}</option>
    })

    const minute = [
        { value: 0, text: "00" },
        { value: 15, text: "15" },
        { value: 30, text: "30" },
        { value: 45, text: "45" },
    ]

    const optionsMinute = minute.map((option) => {
        return <option key={option.value} value={option.value}>{option.text}</option>
    })



    return (
        <>
            <select
                className="block px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={schedule.wakeupHour}
                onChange={(e) => setSchedule({ ...schedule, wakeupHour: parseInt(e.target.value) })}
            >
                {optionsHour}
            </select>
            <select
                className="block px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={schedule.wakeupMinute}
                onChange={(e) => setSchedule({ ...schedule, wakeupMinute: parseInt(e.target.value) })}
            >
                {optionsMinute}
            </select>
        </>
    )
}