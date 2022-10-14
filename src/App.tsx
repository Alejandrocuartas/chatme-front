import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Authenticate from "./pages/Authenticate";
import Chats from "./pages/Chats";
import Messages from "./pages/Messages";
import Search from "./pages/Search";
const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Chats />}></Route>
                    <Route path="/auth" element={<Authenticate />}></Route>
                    <Route path="/search" element={<Search />}></Route>
                    <Route path="/chat/:id" element={<Messages />}></Route>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
