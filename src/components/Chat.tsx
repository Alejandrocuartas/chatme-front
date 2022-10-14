import React from "react";
import { UserSearch } from "../types";

const Chat = ({ user }: { user: UserSearch; children: unknown }) => {
    return (
        <li
            id="chat"
            className="bg-blue-100 px-6 py-2 border-b border-gray-800 w-full flex justify-start items-center"
        >
            <img
                className="h-12 w-12 rounded-full"
                src={user.photo}
                alt="user profile"
            />
            <h6 className="mx-4 font-medium leading-tight text-base mt-0 mb-2 text-white-600">
                {user.name}
            </h6>
        </li>
    );
};

export default Chat;
