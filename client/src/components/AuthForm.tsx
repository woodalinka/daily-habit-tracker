import {Link, useSearchParams} from 'react-router-dom';
import React from "react";

interface AuthFormProps {
    onSubmit: (email: string, password: string, mode: string) => Promise<void>;
}
const AuthForm: React.FC<AuthFormProps> = ({onSubmit}) => {
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';

    const submitHandler = async (e: any) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        await onSubmit(email, password, isLogin ? 'login' : 'signup')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
                <div>
                    <h1 className="text-center text-2xl font-extrabold text-gray-900">
                        {isLogin ? "Log in" : "Create a new user"}
                    </h1>
                </div>
                <form className="mt-8 space-y-6" method="post" onSubmit={submitHandler}>
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
                        <button  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded">
                            {isLogin ? 'Enter' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>)
}

export default AuthForm;