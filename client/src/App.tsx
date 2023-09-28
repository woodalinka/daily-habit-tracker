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
                {path: 'auth', element: <AuthenticationPage />}
            ]
        }
    ])

    return (
        <RouterProvider router={router}/>
    );
}

export default App;
