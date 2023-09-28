import React, {useState, useEffect, ReactNode} from 'react'

type AuthContextProps = {
    isLoggedIn: boolean,
    onLogout: () => void,
    onLogin: () => void
}

const AuthContext = React.createContext<AuthContextProps>({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: () => {}
})

export const AuthContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true)
        }
    }, [])
    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false)
    };

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1')
        setIsLoggedIn(true);
    }

    return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>{children}</AuthContext.Provider>
}

export default AuthContext;