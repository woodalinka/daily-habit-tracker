import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css';

import Other from "./routes/Other";
import Focus from './routes/Focus';
import Journal from "./routes/Journal";
import RootLayout from "./components/RootLayout";
import HomePage from "./routes/HomePage";
import Error from "./routes/Error";
import AuthenticationPage from "./routes/AuthenticationPage";
import {AuthContextProvider} from "./store/auth-context";
import Habits from "./routes/Habits";
import {HabitsProvider} from "./store/habits-context";


const App = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            errorElement: <Error />,
            children: [
                {index: true, element: <HomePage />},
                {path: 'habit', element: <Habits />},
                {path: 'focus', element: <Focus />},
                {path: 'journal', element: <Journal />},
                {path: 'other', element: <Other />},
                {path: 'auth', element: <AuthenticationPage />}
            ]
        }
    ])

    return (
       <AuthContextProvider> <HabitsProvider><RouterProvider router={router}/></HabitsProvider></AuthContextProvider>
    );
}

export default App;
