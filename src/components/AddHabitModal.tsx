import React, { useState } from "react";

type Habit = {
    name: string;
};

type AddHabitModalProps = {
    onAddHabit: (newHabit: Habit) => void;
};

function AddHabitModal({ onAddHabit }: AddHabitModalProps) {
    const [newHabit, setNewHabit] = useState("");

    const handleAddHabit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddHabit({ name: newHabit });
        setNewHabit("");
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <form onSubmit={handleAddHabit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="habitName">
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
        </div>
    );
}

export default AddHabitModal;
