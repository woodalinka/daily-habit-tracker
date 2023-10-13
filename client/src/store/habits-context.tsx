import React, {createContext, useState, useContext, useEffect} from 'react';
import AuthContext from "./auth-context";

export type Habit = {
        description: string;
        _isCompleted: boolean;
        _completedDates: string[];
}

type HabitsContextType = {
    habits: Habit[];
    setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
};

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export const useHabits = () => {
    const context = useContext(HabitsContext);
    if (!context) {
        throw new Error("useHabits must be used within a HabitsProvider");
    }
    return context;
};
export const HabitsProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
    const {isLoggedIn} =useContext(AuthContext);
    const [habits, setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }

        const fetchHabits = async () => {
            const token = localStorage.getItem('token')

            try {
                const response = await fetch('http://localhost:8080/habits', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json()
                setHabits(data);
            } catch (error) {
                console.error('There was a problem with the request', error);
            }
        }

        fetchHabits();
    }, [isLoggedIn]);

    return (
        <HabitsContext.Provider value={{ habits, setHabits }}>
            {children}
        </HabitsContext.Provider>
    );
};