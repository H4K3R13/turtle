import React, { useState } from "react";
import Button from "@mui/material/Button";
import Home from "./Home";


const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleGoogleSignIn = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signIn().then((googleUser) => {
      const profile = googleUser.getBasicProfile();
      console.log('ID:', profile.getId());
      console.log('Name:', profile.getName());
      console.log('Email:', profile.getEmail());
      setLoggedIn(true);
    });
  };

  

  if (loggedIn) {
    return <Home />;
  }

  return (
    <>
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Login with Google</h2>
      <Button variant="contained" onClick={handleGoogleSignIn}>
        Login with Google
      </Button>
    </div>
    </>
  );
}

export default Login;
