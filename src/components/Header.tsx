import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="bg-orange-500 p-4">
            <Link to="/" className="text-white mr-4">Habit</Link>
            <Link to="/focus" className="text-white mr-4">Focus</Link>
            <Link to="/journal" className="text-white mr-4">Journal</Link>
            <Link to="/other" className="text-white mr-4">Other</Link>
        </nav>
    );
}

export default Header;
