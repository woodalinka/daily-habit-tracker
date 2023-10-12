import React, {useContext} from 'react';
import {useLocation, NavLink} from 'react-router-dom';
import AuthContext from "../store/auth-context";

type MainNavProps = {
    onAddHabit: () => void;
    onAddJournalEntry: () => void;
    children?: React.ReactNode;
    isLoggedIn: boolean
}

const MainNavigation: React.FC<MainNavProps> = (props) => {
    const ctx = useContext(AuthContext);
    console.log(ctx.isLoggedIn, "This is what is being passed")

    const location = useLocation();
    let addButtonAction: (() => void) | null;
    let isHomePage;

    switch (location.pathname) {
        case '/habit':
            addButtonAction = props.onAddHabit;
            break;
        case '/journal':
            addButtonAction = props.onAddJournalEntry;
            break;
        default:
            addButtonAction = null;
            break;
        case '/':
            addButtonAction = null;
            isHomePage = true;
            break;
    }

    const activeClass: string = "text-orange-800 underline mr-4";
    const pendingRoute: string = "text-white mr-4 hover:text-orange-800 hover:underline  active:text-orange-800 active:underline";

    return (
        <nav className="flex items-center justify-between bg-orange-500 p-4 h-[4rem]">
            <div>
                <NavLink to="/"
                         className={({isActive}) => {
                             return isActive ? activeClass : pendingRoute
                         }}>
                    Home
                </NavLink>
                {ctx.isLoggedIn &&
                    <NavLink to="/habit"
                             className={({isActive}) => {
                                 return isActive ? activeClass : pendingRoute
                             }}>
                        Habit
                    </NavLink>
                }
                {ctx.isLoggedIn &&
                <NavLink to="/focus"
                         className={({isActive}) => {
                             return isActive ? activeClass : pendingRoute
                         }}>
                    Focus
                </NavLink>
                }
                {ctx.isLoggedIn &&
                    <NavLink to="/journal"
                         className={({isActive}) => {
                             return isActive ? activeClass : pendingRoute
                         }}>
                    Journal
                </NavLink>
                }
                {ctx.isLoggedIn &&
                <NavLink to="/other"
                         className={({isActive}) => {
                             return isActive ? activeClass : pendingRoute
                         }}>
                    Other
                </NavLink>
                }
            </div>
            {isHomePage && (<NavLink to="/auth?mode=login"
                     className={({isActive}) => {
                         return isActive ? activeClass : pendingRoute
                     }}>
                Login/SignUp
            </NavLink>)}
            {addButtonAction && (
                <button className="bg-white text-orange-500 rounded-full h-10 w-10 flex items-center justify-center"
                        onClick={addButtonAction}>+</button>
            )}

        </nav>
    );
}

export default MainNavigation;
