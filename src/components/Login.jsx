import React, { useState } from "react";
import Home from "./Home";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Button } from "@mui/material";


const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  if (loggedIn) {
    return <Home user={user} />;
  }

  const handleClick = () => {
    console.log("Hello")
  };

  return (
    <>
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          var credentialResponse = jwtDecode(credentialResponse.credential)
          console.log(credentialResponse);
          setUser(credentialResponse)
          setLoggedIn(true);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ; */}
      <Button onClick={handleClick}>Click Me</Button>
    </>
  );
};

export default Login;
