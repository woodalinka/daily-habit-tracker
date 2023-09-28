import React, {useContext} from "react";
import authContext from "../store/auth-context";

const Other = () => {
    const ctx = useContext(authContext)

    return (<>
        <div> Other </div>
    <button onClick={ctx.onLogout}>LogOut</button>
    </>)
}

export default Other;
