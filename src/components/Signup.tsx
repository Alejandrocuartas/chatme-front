import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context";
import logo from "../utils/logo";
import api from "../utils/api";
import { SignupResponse } from "../types";

const Signup = ({ signIn }: { signIn: () => void }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const { setUser } = useGlobalState();
    const signup = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const passwordsAreSame =
            formData.get("password") === formData.get("password2");
        if (!passwordsAreSame) {
            return alert("The passwords are not the same.");
        }
        setLoading(true);
        fetch(api + "/api/signup", {
            method: "POST",
            body: formData,
        })
            .then(async (res) => {
                const response: SignupResponse = await res.json();
                if (!res.ok) {
                    setLoading(false);
                    throw new Error(response.error);
                } else {
                    const { jwt, user } = response;
                    setUser({
                        ...user,
                        jwt,
                    });
                    setLoading(false);
                    sessionStorage.setItem("jwt", jwt);
                    navigate("/");
                }
            })
            .catch((err: { message: string }) => {
                if (
                    err.message.includes("username") &&
                    err.message.includes("username")
                ) {
                    return alert("Username already exists.");
                } else {
                    alert("Unexpected error");
                }
            });
    };
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
                        Create an account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={signup}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="user-name" className="sr-only">
                                Name
                            </label>
                            <input
                                id="user-name"
                                name="name"
                                type="name"
                                autoComplete="name"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Name"
                                maxLength={15}
                            />
                        </div>
                        <div>
                            <label htmlFor="user-lastname" className="sr-only">
                                Name
                            </label>
                            <input
                                id="user-lastname"
                                name="last_name"
                                type="lastname"
                                autoComplete="lastname"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Last name"
                                maxLength={30}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Username
                            </label>
                            <input
                                id="email-address"
                                name="username"
                                type="username"
                                autoComplete="username"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Username"
                                maxLength={10}
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
                        <div>
                            <label htmlFor="password2" className="sr-only">
                                Password again
                            </label>
                            <input
                                id="password2"
                                name="password2"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password again"
                            />
                        </div>
                        <div>
                            <label htmlFor="profile-photo">
                                Profile photo (opcional)
                            </label>
                            <input
                                id="profile-photo"
                                name="profile"
                                type="file"
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                                Sign up
                            </button>
                        )}
                    </div>
                </form>
                <div>
                    {loading ? null : (
                        <button
                            onClick={() => signIn()}
                            type="button"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
