import React from "react";
import Card from "../utils/Card";

type HabitsProps = {
    habits: { name: string; _isCompleted: boolean; _completedDates: string[]}[];
}
const Habits = ({habits}: HabitsProps) => {
    return (<div className="container mx-auto p-4">
        {habits.length === 0 ?
            <div className="flex justify-center items-center h-screen">
                <button className="bg-white text-orange-500 rounded-full h-10 w-10 flex items-center justify-center text-2xl">
                    Click on the Plus to add your first habit
                </button>
            </div> :
            <ul>
                {habits.map((habit, index) => (
                    <Card key={index} title={habit.name} isCompleted={habit._isCompleted} />
                ))}
            </ul>
        }
    </div>)
}

export default Habits;
