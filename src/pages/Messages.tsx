import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalState } from "../context";
import { NavbarState } from "../utils/enums";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Message from "../components/Message";
import messagesQuery from "../queries/messages";
import { useQuery, useMutation } from "@apollo/client";
import newMessage from "../queries/newMessage";
const Messages = () => {
    const { setNavState, user, socket } = useGlobalState();
    const navigate = useNavigate();
    const [submitMessage, { data }] = useMutation(newMessage);

    const { id } = useParams();
    const [messages, setMessages] = useState<any[]>([]);
    const [msg, setMsg] = useState("");
    const { loading, error, refetch } = useQuery(messagesQuery, {
        variables: {
            person1: Number(id),
            person2: user?.id || Number(id),
        },
        onCompleted(data) {
            setMessages(data.messages);
        },
    });
    const setMessage = (e: any) => {
        setMsg(e.target.value);
    };
    const sendMessage = async () => {
        const response = await submitMessage({
            variables: {
                message: msg,
                emitter: user?.id,
                listener: Number(id),
            },
        });
        setMessages([...messages, response.data.newMessage]);
        socket.emit("send-message", {
            room: id,
            emitter: user?.id,
        });
        setMsg("");
    };
    useEffect(() => {
        refetch();
        setNavState(NavbarState.chat);
        if (!user) {
            navigate("/auth");
        }
        // @ts-ignore
        const codeRoom: string = `${id}+${user?.id}`;
        socket.emit("join-room", codeRoom);
        socket.on("receive-message", (messages) => {
            setMessages(messages);
        });
        return () => {
            socket.emit("leave-room", codeRoom);
            setNavState(NavbarState.normal);
        };
    }, []);
    if (error) {
        if (error.message.includes("400")) {
            alert("Ocurrió un error con los mensajes. Recarga la página");
        }
    }
    return (
        <Fragment>
            {loading ? (
                <h1 className="mx-4 font-medium leading-tight text-base mt-0 mb-2 text-white-600">
                    Loading...
                </h1>
            ) : (
                <div id="message" className="flex flex-col mt-4">
                    {messages.length === 0 ? (
                        <h1 className="mx-4 font-medium leading-tight text-base mt-0 mb-2 text-white-600">
                            write the first message
                        </h1>
                    ) : (
                        messages.map((message: any) => {
                            const isEmitter = message.listener_id !== user?.id;
                            return (
                                <Message
                                    key={message.id}
                                    isEmitter={isEmitter}
                                    message={message.message}
                                    id={message.id}
                                ></Message>
                            );
                        })
                    )}
                </div>
            )}

            <div
                id="message-send"
                className="sticky bottom-0 h-12 py-5 px-2 bg-gray-800 flex justify-between items-center w-full"
            >
                <input
                    onChange={setMessage}
                    className="h-10 focus:outline-0 w-full bg-gray-300 py-5 px-3 rounded-xl"
                    type="text"
                    placeholder="type your message here..."
                    value={msg}
                />
                <button onClick={sendMessage}>
                    <PaperAirplaneIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                        color="#d1d5db"
                    ></PaperAirplaneIcon>
                </button>
            </div>
        </Fragment>
    );
};

export default Messages;
