import React from "react";

type HabitsProps = {
    habits: { name: string}[];
}
function Habits ({habits}: HabitsProps) {
    return (<div className="container mx-auto p-4">
        {habits.length === 0 ?
            <div className="flex justify-center items-center h-screen">
                <button className="bg-white text-orange-500 rounded-full h-10 w-10 flex items-center justify-center text-2xl">
                    Click on the Plus to add your first habit
                </button>
            </div> :
            <ul>
                {habits.map((habit, index) => (
                    <li key={index}>
                        <h2>{habit.name}</h2>
                    </li>
                ))}
            </ul>
        }
    </div>)
}

export default Habits;