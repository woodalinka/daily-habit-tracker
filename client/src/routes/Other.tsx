import React, {useContext} from "react";
import authContext from "../store/auth-context";
import {useNavigate} from "react-router-dom";

const Other = () => {
    const ctx = useContext(authContext)
    const navigate = useNavigate();

    const logOutHandler = () => {
        ctx.onLogout();
        navigate('/');
    }

    return (<>
        <div> Other </div>
    <button onClick={logOutHandler}>LogOut</button>
    </>)
}

export default Other;
