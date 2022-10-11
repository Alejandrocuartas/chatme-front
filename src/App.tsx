import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Authenticate from "./pages/Authenticate";
const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Authenticate />}></Route>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
