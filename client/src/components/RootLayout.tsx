import React, {useState} from 'react';
import {Outlet} from 'react-router-dom'
import MainNavigation from "./MainNavigation";
import Backdrop from "../utils/Backdrop";
import AddHabitModal from "./AddHabitModal";

type Habit = {
    name: string;
    _isCompleted: boolean;
    _completedDates: string[];
}

const RootLayout = () => {
    const [showModal, setShowModal] = useState(false);
    const [habits, setHabits] = useState<Habit[]>([]);

    const closeModal = () => {
        setShowModal(false);
    }

    const addHabit = (newHabit: Habit) => {
        setHabits([...habits, newHabit]);
        setShowModal(false);
    }

    return (
        <React.Fragment>
            {showModal &&
                <>
                    <Backdrop onClick={closeModal} />
                    <AddHabitModal show onClose={closeModal} onAddHabit={addHabit} />
                </>
            }
            <MainNavigation onAddHabit={() => {setShowModal(true)}} onAddJournalEntry={() => {setShowModal(true)}} isLoggedIn={false}/>
        <Outlet />
        </React.Fragment>
    )
}

export default RootLayout;