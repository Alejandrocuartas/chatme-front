import React, { useState, createContext, useContext } from "react";
import { io } from "socket.io-client";
import { GlobalContextType, PartialSearch, User } from "../types";
import { NavbarState } from "../utils/enums";
// @ts-ignore
const logContext = createContext<GlobalContextType>();
const Context = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<User | undefined>();
    const [navState, setNavState] = useState<NavbarState>(NavbarState.normal);
    const [searched, setSearched] = useState<PartialSearch | undefined>();
    const defaultContext: GlobalContextType = {
        socket: io("http://localhost:3000"),
        user,
        setUser,
        navState,
        setNavState,
        searched,
        setSearched,
    };

    return (
        <logContext.Provider value={defaultContext}>
            {children}
        </logContext.Provider>
    );
};

const useGlobalState = () => useContext(logContext);

export { Context, useGlobalState };
