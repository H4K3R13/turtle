import { useState } from "react";
import Home from "./Home";
import { Button } from "@mui/material";
import { login } from "./api";
import Navbar from "./Navbar";
import Form from "./Form";
import SearchBar from "./SearchBar";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Use null as initial state for user

  const handleClick = async () => {
    try {
      const userID = await login();
      console.log("User ID Response", userID);
      if (userID) {
        setUser(userID)
        setLoggedIn(true);
      }

    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  if (loggedIn) {
    console.log("Logged In");
    return (<>
    <Navbar/>
    <Form user={user}/>
    <SearchBar/>
    </>)
  }

  return (
    <>
      <Button onClick={handleClick}>Sign In Using Google</Button>
    </>
  );
};

export default Login;
