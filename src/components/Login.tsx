import * as React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../utils/logo";
import { useLazyQuery } from "@apollo/client";
import loginQuery from "../queries/login";
import { useGlobalState } from "../context";
import { LoginResponse } from "../types";

const Login = ({ signUp }: { signUp: () => void }) => {
    const navigate = useNavigate();
    const { setUser } = useGlobalState();
    const [logIn, { loading, error }] = useLazyQuery(loginQuery, {
        onCompleted: (data: LoginResponse) => {
            const { jwt, user } = data.login;
            setUser({
                ...user,
                jwt,
            });
            sessionStorage.setItem("jwt", jwt);
            navigate("/");
        },
    });
    const login = (e: any) => {
        e.preventDefault();
        const credentials = new FormData(e.target);
        const username = credentials.get("username");
        const password = credentials.get("password");
        const variables = {
            username,
            password,
        };
        return logIn({ variables });
    };
    if (error) {
        alert(error.message);
    }
    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src={logo}
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={login}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="username"
                                type="username"
                                autoComplete="username"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div>
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <h1>Loading...</h1>
                            </div>
                        ) : (
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Sign in
                            </button>
                        )}
                    </div>
                </form>
                <div>
                    {loading ? null : (
                        <button
                            onClick={() => signUp()}
                            type="button"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Create account
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
