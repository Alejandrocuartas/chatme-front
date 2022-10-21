import * as React from "react";
import { Navigate } from "react-router-dom";
import Chat from "../components/Chat";
import { useGlobalState } from "../context";
import { NavbarState } from "../utils/enums";
const Search = () => {
    const { user, setNavState, searched } = useGlobalState();
    React.useEffect(() => {
        setNavState(NavbarState.search);
        return () => {
            setNavState(NavbarState.normal);
        };
    }, []);
    if (!searched) {
        return (
            <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-black-600">
                Search an user
            </h2>
        );
    }
    if (searched?.length === 0) {
        return (
            <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-black-600">
                No matches
            </h2>
        );
    }
    return (
        <div className="flex justify-center">
            <ul className="bg-white rounded-lg border border-gray-200 w-full text-gray-900">
                {searched.map((u) => {
                    return (
                        <Chat key={u.id} user={u}>
                            hi
                        </Chat>
                    );
                })}
            </ul>
            {!user ? <Navigate to="/auth"></Navigate> : null}
        </div>
    );
};

export default Search;
