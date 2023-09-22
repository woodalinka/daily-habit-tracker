import React from 'react';
import { Link } from 'react-router-dom';

type HeaderProps = {
    onAddHabit: () => void;
    children?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({onAddHabit, children}) => {
    return (
        <nav className="flex justify-between bg-orange-500 p-4">
            <div>
            <Link to="/" className="text-white mr-4">Habit</Link>
            <Link to="/focus" className="text-white mr-4">Focus</Link>
            <Link to="/journal" className="text-white mr-4">Journal</Link>
            <Link to="/other" className="text-white mr-4">Other</Link>
            </div>
            <button className="bg-white text-orange-500 rounded-full h-10 w-10 flex items-center justify-center"
                onClick={onAddHabit}>+</button>
        </nav>
    );
}

export default Header;
