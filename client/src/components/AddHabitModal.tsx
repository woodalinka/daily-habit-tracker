import React, {useEffect, useState, useRef} from "react";
import {useHabits} from "../store/habits-context";

type Habit = {
    description: string;
    _isCompleted: boolean;
    _completedDates: string[];
};

type AddHabitModalProps = {
    show: boolean;
    onClose: () => void;
    onAddHabit: (newHabit: Habit) => void;
};


const AddHabitModal = ({show, onClose}: AddHabitModalProps) => {
    const [newHabit, setNewHabit] = useState("");
    const modalRef = useRef<HTMLDivElement>(null);
    const {setHabits} = useHabits();

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (!modalRef.current?.contains(event.target)) {
                onClose();
            }
        }
        if (show) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [show, onClose]);
    const handleAddHabit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newHabitData = {description: newHabit, _isCompleted: false, _completedDates: []}
        setHabits(prevHabits => [...prevHabits, newHabitData]);
        const token = localStorage.getItem('token')

        try {
            const response = await fetch('http://localhost:8080/habits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newHabitData)
            });

            if (response.ok) {
                console.log('Habit added successfully');
                onClose()
            } else {
                console.log('Failed to add habit');
            }
        } catch (error) {
            console.error('There was a problem with the request', error);
        }

        setNewHabit("");
    };

    return (
        <div
            className={`fixed z-10 inset-0 ${show ? "" : "hidden"}`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                ref={modalRef}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <form onSubmit={handleAddHabit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2"
                               htmlFor="habitName">
                            I want to...
                        </label>
                        <input
                            type="text"
                            id="habitName"
                            placeholder="Enter Habit"
                            value={newHabit}
                            onChange={(e) => setNewHabit(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddHabitModal;
