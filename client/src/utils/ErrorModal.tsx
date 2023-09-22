import React from 'react';
import ReactDom from 'react-dom';
import NotificationCard, {NotificationCardProps} from "./NotificationCard";
import Backdrop from "./Backdrop";

interface ErrorModalProps {
    title: string;
    message: string;
    onClick: () => void;
}

const ModalOverlay: React.FC<ErrorModalProps> = ({title, message, onClick}) => {
    return (
        <NotificationCard>
            <header className="bg-orange-500 p-4">
                <h2 className="text-white font-bold">{title}</h2>
            </header>
            <div className="bg-white p-4">
                <p className="text-black">{message}</p>
            </div>
            <footer className="bg-gray-200 p-4">
                <button className="bg-orange-500 text-white rounded px-4 py-2" onClick={onClick}>Okay</button>
            </footer>
        </NotificationCard>
    )
}


const ErrorModal: React.FC<ErrorModalProps> = ({title, message, onClick}) => {
    return (
        <React.Fragment>
            {ReactDom.createPortal(<Backdrop onClick={onClick} />, document.getElementById('backdrop-root')!)}
            {ReactDom.createPortal(<ModalOverlay title={title} message={message} onClick={onClick} />, document.getElementById('modal-root')!)}
        </React.Fragment>

    )

}

export default ErrorModal;