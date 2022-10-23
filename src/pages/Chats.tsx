import { useQuery } from "@apollo/client";
import * as React from "react";
import { Navigate } from "react-router-dom";
import Chat from "../components/Chat";
import { useGlobalState } from "../context";
import chatsQuery from "../queries/chats";
import { Chats } from "../types";
const Chats = () => {
    const { user, setChats, chats } = useGlobalState();
    const { loading, error, refetch } = useQuery(chatsQuery, {
        onCompleted: (data: Chats) => {
            setChats(data);
        },
        context: {
            headers: {
                Authorization: `Bearer ${user?.jwt}`,
            },
        },
    });
    React.useEffect(() => {
        refetch();
    }, []);
    if (loading) {
        return (
            <h1 className="mx-4 font-medium leading-tight text-base mt-0 mb-2 text-white-600">
                Loading...
            </h1>
        );
    }
    if (error) {
        alert(error.message);
    }
    if (!chats || chats.chats.length === 0) {
        return (
            <h1 className="mx-4 font-medium leading-tight text-base mt-0 mb-2 text-white-600">
                Waiting for chats...
                {!user ? <Navigate to="/auth"></Navigate> : null}
            </h1>
        );
    }

    return (
        <div>
            {chats?.chats.map((c) => {
                return <Chat user={c} key={c.id} />;
            })}
            {!user ? <Navigate to="/auth"></Navigate> : null}
        </div>
    );
};

export default Chats;
