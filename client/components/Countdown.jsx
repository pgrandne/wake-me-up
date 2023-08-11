import { useEffect, useState } from "react"

export const Countdown = () =>{
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] =useState(0);

    useEffect(() =>{
        const target = new Date("12/08/2023 06:00:00")
        
        const interval = setInterval(()=>{
            const today = new Date(); 
            
            //Actual hour:
            const hourTop = today.getHours();
            
            const difference = target.getTime() - today.getTime();
            const h = Math.floor((difference%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
            setHours(h);
            
            const m = Math.floor((difference % (1000 * 60 * 60 ))/(1000 * 60));
            setMinutes(m);
    
            const s = Math.floor((difference % (1000 * 60 ))/(1000));
            setSeconds(s
                );

        }, 1000);

        return () => clearInterval(interval);
    }, []);
 
    return(
        <div className="time-wrapper">
            <button className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-10 py-1.5 rounded-md">Make money</button>
            <div className="timer-inner text-center  text-xs text-gray-500 flex justify-center my-3 gap-1">
                    <span className="text-center ">{hours} h {minutes} m {seconds} s </span>           
            </div>         
        </div>
    )
}