import React from "react";
import { useNavigate } from "react-router-dom";
import { User, UserSearch } from "../types";

const Chat = ({
    user,
}: {
    user: UserSearch | Omit<User, "jwt">;
    children?: unknown;
}) => {
    const navigate = useNavigate();
    return (
        <li
            onClick={() =>
                navigate(`/chat/${user.id}`, {
                    state: {
                        user,
                    },
                })
            }
            id="chat"
            className="bg-blue-100 hover:bg-blue-300 px-6 py-2 border-b border-gray-100 w-full flex justify-start items-center"
        >
            <img
                className="h-12 w-12 rounded-full"
                src={user.photo}
                alt="user profile"
            />
            <h6 className="mx-4 font-medium leading-tight text-base mt-0 mb-2 text-white-600">
                {user.username}
            </h6>
        </li>
    );
};

export default Chat;
