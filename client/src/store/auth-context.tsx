import React, {useState, useEffect, ReactNode} from 'react';


type AuthContextProps = {
    isLoggedIn: boolean,
    onLogout: () => void,
    onLogin: (token: string) => void
}

const AuthContext = React.createContext<AuthContextProps>({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: () => {}
})

export const AuthContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('token');
        console.log("whats in storage", storedUserLoggedInInformation)

        if (storedUserLoggedInInformation) {
            setIsLoggedIn(true)
        }
    }, [])
    const logoutHandler = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
    };

    const loginHandler = (token: string) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    }

    return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>{children}</AuthContext.Provider>
}

export default AuthContext;