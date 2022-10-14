import * as React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalState } from "../context";
const Chats = () => {
    const { user } = useGlobalState();
    return (
        <div>
            <h1>hi</h1>
            {!user ? <Navigate to="/auth"></Navigate> : null}
        </div>
    );
};

export default Chats;
