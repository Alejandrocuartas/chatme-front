import React, { useState, createContext, useContext } from "react";
import { io } from "socket.io-client";
import { GlobalContextType } from "../types";

// @ts-ignore
const logContext = createContext<GlobalContextType>(1);
const Context = ({ children }: { children: JSX.Element }) => {
    const defaultContext: GlobalContextType = {
        io: io("http://localhost:3000"),
    };

    return (
        <logContext.Provider value={defaultContext}>
            {children}
        </logContext.Provider>
    );
};

const useGlobalState = () => useContext(logContext);

export { Context, useGlobalState };
