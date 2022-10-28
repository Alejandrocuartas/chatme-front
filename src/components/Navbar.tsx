import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "../utils/logo";
import { useGlobalState } from "../context";
import defaultProfile from "../utils/defaultProfile";
import { NavbarState } from "../utils/enums";

import SearchBar from "./SearchBar";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    const { user, navState } = useGlobalState();
    const navigate = useNavigate();
    const { state } = useLocation();
    return (
        <Disclosure as="nav" className="bg-gray-800 sticky top-0">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex items-center justify-start sm:items-stretch sm:justify-start">
                                <div
                                    onClick={() => {
                                        if (user) {
                                            navigate("/");
                                        } else {
                                            alert(
                                                "You have to log in if you want to see your chats list."
                                            );
                                        }
                                    }}
                                    className="flex flex-shrink-0 items-center cursor-pointer"
                                >
                                    <img
                                        className="block h-8 w-auto lg:hidden"
                                        src={logo}
                                        alt="Your Company"
                                    />
                                    <img
                                        className="hidden h-8 w-auto lg:block"
                                        src={logo}
                                        alt="Your Company"
                                    />
                                </div>
                                {navState === NavbarState.chat &&
                                user &&
                                state ? (
                                    <div className="ml-4 flex flex-shrink-0 items-center">
                                        <img
                                            className="block h-8 w-auto lg:hidden rounded-full"
                                            src={state.user.photo}
                                            alt="Your Company"
                                        />
                                        <img
                                            className="hidden h-8 w-auto lg:block"
                                            src={state.user.photo}
                                            alt="Your Company"
                                        />
                                        <h5 className="mx-4 font-medium leading-tight text-base mt-2 mb-2 text-white">
                                            {state.user.name}{" "}
                                            {state.user.last_name}
                                        </h5>
                                    </div>
                                ) : null}
                            </div>
                            {navState === NavbarState.search ? (
                                <SearchBar />
                            ) : null}
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {navState === NavbarState.normal ? (
                                    <button
                                        onClick={() => {
                                            if (user) {
                                                navigate("/search");
                                            } else {
                                                alert(
                                                    "You have to log in if you want to search an user."
                                                );
                                            }
                                        }}
                                        type="button"
                                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="sr-only">
                                            View notifications
                                        </span>
                                        <MagnifyingGlassIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </button>
                                ) : null}

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">
                                                Open user menu
                                            </span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src={
                                                    user?.photo ||
                                                    defaultProfile
                                                }
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/"
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-100"
                                                                : "",
                                                            "block px-4 py-2 text-sm text-gray-700"
                                                        )}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    );
}
