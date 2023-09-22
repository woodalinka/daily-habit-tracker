import React from 'react';

interface BackdropProps {
    onClick: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
    return (
        <div
            className="fixed inset-0 z-10 bg-orange-400 opacity-50"
            onClick={onClick}
        ></div>
    );
}

export default Backdrop;
