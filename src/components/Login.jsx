import React, { useState } from "react";
import Home from "./Home";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({})

  if (loggedIn) {
    return <Home user={user} />;
  }

  return (
    <>
      <GoogleLogin
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
      ;
    </>
  );
};

export default Login;
