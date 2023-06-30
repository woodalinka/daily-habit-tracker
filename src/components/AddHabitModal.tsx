import React, { useState } from "react";

type Habit = {
    name: string;
};

type AddHabitModalProps = {
    onAddHabit: (habit: Habit) => void;
};

function AddHabitModal({ onAddHabit }: AddHabitModalProps) {
    const [showModal, setShowModal] = useState(false);
    const [newHabit, setNewHabit] = useState("");

    const handleAddHabit = () => {
        onAddHabit({ name: newHabit });
        setNewHabit("");
        setShowModal(false);
    };

    if (!showModal) {
        return <button onClick={() => setShowModal(true)}>Add Habit</button>;
    }

    return (
        <div>
            <input value={newHabit} onChange={(e) => setNewHabit(e.target.value)} />
            <button onClick={handleAddHabit}>Add</button>
        </div>
    );
}

export default AddHabitModal;
