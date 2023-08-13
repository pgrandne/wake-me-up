import { CardClaim, CardSettings } from '.';
import { useContractRead } from 'wagmi'
import { ABI_WakeMeUp, goerliContract } from '../lib';
import { useState } from 'react';

export const Card = ({ account }: { account: `0x${string}` | undefined; }) => {

    const [schedule, setSchedule] = useState({
        wakeupWeekHour: 0,
        wakeupWeekMinute: 0,
        wakeupWeekendHour: 0,
        wakeupWeekendMinute: 0
    })

    const checkSchedule = () => {
        if (schedule.wakeupWeekHour === 0 && schedule.wakeupWeekMinute === 0 && schedule.wakeupWeekendHour === 0 && schedule.wakeupWeekendMinute === 0)
            return false
        else
            return true
    }

    const { data, isError, isLoading } = useContractRead({
        address: goerliContract,
        abi: ABI_WakeMeUp,
        functionName: 'getWakeupSchedule',
        args: [account],
        onSuccess(data: any) {
            setSchedule(data)
        },
    })

    return (
        <>
            {!checkSchedule() && <CardSettings />}
            {checkSchedule() && <CardClaim account={account} />}
        </>
    )
}
