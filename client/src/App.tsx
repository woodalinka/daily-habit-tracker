import React from 'react';
import {createBrowserRouter, RouterProvider, useNavigate} from 'react-router-dom';
import './App.css';

import Other from "./routes/Other";
import Focus from './routes/Focus';
import Journal from "./routes/Journal";
import RootLayout from "./components/RootLayout";
import HomePage from "./routes/HomePage";
import Error from "./routes/Error";
import AuthenticationPage, {action as authAction} from "./routes/AuthenticationPage";
import {AuthContextProvider} from "./store/auth-context";


// type AppProps = HabitsProps;

const App = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            errorElement: <Error />,
            children: [
                {index: true, element: <HomePage />},
                // {path: 'habit', element: <Habits habits={}}
                {path: 'focus', element: <Focus />},
                {path: 'journal', element: <Journal />},
                {path: 'other', element: <Other />},
                {path: 'auth', element: <AuthenticationPage />, action: authAction}
            ]
        }
    ])

    return (
       <AuthContextProvider> <RouterProvider router={router}/></AuthContextProvider>
    );
}

export default App;
