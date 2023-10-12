import React from "react";
import HabitCard from "../utils/HabitCard";
import { useHabits, Habit } from "../store/habits-context";


const Habits = () => {
    const {habits} = useHabits();

    return (

        <div className="container mx-auto p-4">
        {habits.length === 0 ?
            <div className="flex justify-center items-start mt-4">
                <div className="bg-white text-orange-500 flex items-center justify-center text-2xl">
                    Click on the Plus to add your first habit
                </div>
            </div> :
            <ul>
                {habits.map((habit: Habit, index) => (
                    <HabitCard key={index} title={habit.description} isCompleted={habit._isCompleted} />
                ))}
            </ul>
        }
    </div>
    )
}

export default Habits;
