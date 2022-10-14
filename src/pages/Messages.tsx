import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGlobalState } from "../context";
import { NavbarState } from "../utils/enums";
import { UserSearch, User } from "../types";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Message from "../components/Message";

const Messages = () => {
    const { setNavState } = useGlobalState();
    const { id } = useParams();
    const { state }: { state: { user: UserSearch | Omit<User, "jwt"> } } =
        useLocation();
    useEffect(() => {
        setNavState(NavbarState.chat);
        return () => {
            setNavState(NavbarState.normal);
        };
    }, []);
    return (
        <div>
            <div id="message">
                <Message></Message>
            </div>
            <div
                id="message-send"
                className="py-5 px-2 bg-gray-800 flex justify-between items-center w-full"
            >
                <input
                    className="focus:outline-0 w-full bg-gray-300 py-5 px-3 rounded-xl"
                    type="text"
                    placeholder="type your message here..."
                />
                <button>
                    <PaperAirplaneIcon
                        className="h-10 w-10"
                        aria-hidden="true"
                        color="#d1d5db"
                    ></PaperAirplaneIcon>
                </button>
            </div>
        </div>
    );
};

export default Messages;
