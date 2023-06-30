import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <Link to="/" className="text-white mr-4">Habit</Link>
            <Link to="/focus" className="text-white mr-4">Focus</Link>
            <Link to="/journal" className="text-white mr-4">Journal</Link>
            <Link to="/other" className="text-white mr-4">Other</Link>
        </div>
    );
}

export default Header;
