import React, {useEffect, useState} from "react";

const Focus = () => {
    const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(25 * 60);

    const switchToFocus = () => {
        setMode('FOCUS');
        setTimeLeft(25 * 60);
    };

    const switchToBreak = () => {
        setMode('BREAK');
        setTimeLeft(5 * 60);
    };

    //Updating time every second if timer is running
    useEffect( () => {
        let intId: number|null = null;

        if (isRunning) {
            intId = window.setInterval(() => {
                setTimeLeft(
                    (() => {
                        if (timeLeft === 0) {
                            setIsRunning(false);
                            alert("Time is up");
                            return 25 * 60;
                        }
                        return timeLeft - 1;
                    })()
                );
            }, 1000)
        }

        if (!isRunning && intId !== null) {
            window.clearInterval(intId);
        }

        return () => {
            if (intId !== null) {
                window.clearInterval(intId);
            }
        };
    }, [isRunning, timeLeft])


    // Converting time to minutes and seconds
    const minutes = ("0" + Math.floor(timeLeft / 60).toString()).slice(-2);
    const seconds = ("0" + (timeLeft % 60).toString()).slice(-2);


    return (
        <div className="h-screen flex items-center justify-center bg-white">
            <div className={`text-center p-8 rounded shadow-lg ${mode === 'FOCUS' ? 'bg-orange-500' : 'bg-blue-200'}`}>
                <div className="flex justify-center mb-4">
                    <button onClick={switchToFocus} className={`mr-2 py-2 px-4 rounded ${mode === 'FOCUS' ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-500'}`}>Focus</button>
                    <button onClick={switchToBreak} className={`py-2 px-4 rounded ${mode === 'BREAK' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}>Break</button>
                </div>
                <div className="text-4xl mb-4 text-white">
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </div>
                <button onClick={() => setIsRunning((prev) => !prev)} className="py-2 px-4 rounded bg-white text-orange-500 border border-orange-500">
                    {isRunning ? 'Pause' : 'Start'}
                </button>
            </div>
        </div>
    )
}
export default Focus;
