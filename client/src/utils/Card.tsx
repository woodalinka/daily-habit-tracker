import React, {useState} from "react";

type CardProps = {
    title: string;
    isCompleted: boolean;
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Card = ({title, isCompleted}:  CardProps ) => {
    const [completed, setCompleted] = useState(
        daysOfWeek.map(() => false)
    );

    const handleCompleteChange = (index: number) => {
        const newCompletionStatus = [...completed];
        newCompletionStatus[index] = !newCompletionStatus[index];
        setCompleted(newCompletionStatus);
    };

    return (
        <div className="bg-orange-500 text-white rounded-lg p-4 m-2">
            <h2 className="text-xl">{title}</h2>
            <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input type="checkbox" checked={completed[index]} onChange={() => handleCompleteChange(index)}/>
                        <p>{day}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Card;
