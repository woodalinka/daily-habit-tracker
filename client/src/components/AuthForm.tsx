import {Form, Link, useSearchParams} from 'react-router-dom';
import React, {useContext} from "react";
import AuthContext from "../store/auth-context";

type AuthFormProps = {
    onAuthenticate: () => void;
}
const AuthForm = () => {
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';

    const ctx = useContext(AuthContext);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
                <div>
                    <h1 className="text-center text-2xl font-extrabold text-gray-900">
                        {isLogin ? "Log in" : "Create a new user"}
                    </h1>
                </div>
                <Form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                className="rounded-t-md focus:ring-orange-500 focus:border-orange-500 block w-full p-3 border-gray-300 rounded-md"
                                placeholder="Email"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="image" className="sr-only">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            required
                            className="rounded-b-md focus:ring-orange-500 focus:border-orange-500 block w-full p-3 border-gray-300 rounded-md"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Link
                            to={`?mode=${isLogin ? 'signup': 'login'}`}
                            type="button"
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
                        >
                            {isLogin ? 'Create new user' : 'Login'}
                        </Link>
                        <button  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded" onClick={ctx.onLogin}>
                            Save
                        </button>
                    </div>
                </Form>
            </div>
        </div>)
}

export default AuthForm;