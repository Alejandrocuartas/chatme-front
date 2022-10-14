import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";
import { Context } from "./context";
import "./global.css";

const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    },
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Context>
            <App />
        </Context>
    </ApolloProvider>,
    document.getElementById("root")
);
