import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";
import { Context } from "./context";
import "./global.css";
import api from "./utils/api";

const client = new ApolloClient({
    uri: `${api}/graphql`,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Context>
            <App />
        </Context>
    </ApolloProvider>,
    document.getElementById("root")
);
