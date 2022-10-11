import * as React from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
const Authenticate = () => {
    return <div>{true ? <Login></Login> : <Signup></Signup>}</div>;
};

export default Authenticate;
