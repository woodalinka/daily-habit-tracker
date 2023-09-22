import React from 'react';

export interface NotificationCardProps {
    children: React.ReactNode;
}

const NotificationCard: React.FC<NotificationCardProps> = ({children}) => {
    return (
        <div className="border rounded-lg shadow-lg overflow-hidden">
            {children}
        </div>)
}

export default NotificationCard;