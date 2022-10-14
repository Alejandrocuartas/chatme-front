import * as React from "react";
import { useGlobalState } from "../context";
import { PartialSearch } from "../types";
const SearchBar = () => {
    const { socket, setSearched } = useGlobalState();
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        if (input === "") {
            setSearched(undefined);
        } else {
            socket.emit("users-search", input);
            socket.on("partial-search", (data: PartialSearch) => {
                setSearched(data);
            });
        }
    };
    React.useEffect(() => {
        return () => {
            setSearched(undefined);
        };
    }, []);
    return (
        <div className="flex justify-center">
            <div className="xl:w-96">
                <input
                    onChange={onSearch}
                    type="text"
                    className="
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    id="exampleText0"
                    placeholder="username"
                />
            </div>
        </div>
    );
};

export default SearchBar;
