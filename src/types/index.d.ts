import type { Socket } from "socket.io-client";
export type GlobalContextType = {
    readonly socket: Socket;
    user?: User;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    navState: NavbarState;
    setNavState: React.Dispatch<React.SetStateAction<NavbarState>>;
    searched?: PartialSearch;
    setSearched: React.Dispatch<
        React.SetStateAction<PartialSearch | undefined>
    >;
    chats?: Chats;
    setChats: React.Dispatch<React.SetStateAction<Chats | undefined>>;
};

export type User = {
    readonly id: number;
    readonly name: string;
    readonly username: string;
    readonly last_name: string;
    readonly photo: string;
    readonly jwt: string;
};

export type LoginResponse = {
    readonly login: {
        readonly jwt: string;
        readonly user: Omit<User, "jwt">;
    };
};

export type SignupResponse = {
    readonly jwt: string;
    readonly user: Omit<User, "jwt">;
    readonly error?: string;
};

export type PartialSearch = UserSearch[];

export type UserSearch = Omit<User, "jwt"> & { password: string };

export type Chats = {
    chats: Omit<User, "jwt">[];
};
