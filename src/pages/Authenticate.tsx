import * as React from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
const Authenticate = () => {
    const [login, setLogin] = React.useState(true);
    const otherAuth = () => {
        setLogin(!login);
    };
    return (
        <div>
            {login ? (
                <Login signUp={otherAuth}></Login>
            ) : (
                <Signup signIn={otherAuth}></Signup>
            )}
        </div>
    );
};

export default Authenticate;
