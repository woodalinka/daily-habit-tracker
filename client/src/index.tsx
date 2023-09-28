import { createRoot } from 'react-dom/client';
import App from "./App";
import './index.css';
import './tailwind.css';
import {AuthContextProvider} from "./store/auth-context";
import React from "react";


const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<AuthContextProvider><App /></AuthContextProvider>);
