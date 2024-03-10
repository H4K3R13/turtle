import { useState } from "react";
import Home from "./Home";
import { Button } from "@mui/material";
import { login } from "./api";
import Navbar from "./Navbar";
import Form from "./Form";
import SearchBar from "./SearchBar";
import { useEffect } from "react";
import turtleLogo from "/turtle.png";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Use null as initial state for user

  const handleClick = async () => {
    try {
      const userID = await login();
      console.log("User ID Response", userID);
      const data = userID 
      localStorage.setItem('turtleUser', JSON.stringify(data)); // userID is getting saved 2 times. 
      if (userID) {
        setUser(userID);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  useEffect(()=>{
    const userID = localStorage.getItem('turtleUser')
    if (userID) {
      setUser(userID);
      setLoggedIn(true);
    }

  },[])
  if (loggedIn) {
    console.log("Logged In");
    return (
      <>
        <Navbar />
        <Form user={user} />
        <SearchBar user={user} />
      </>
    );
  }

  return (
    <>
      <Button
        onClick={handleClick}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "10px",
          backgroundImage:
            "url('https://www.gstatic.com/images/icons/material/product/2x/google_identity_grey600_24dp.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "24px 24px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0px 0px 5px 0px rgba(255, 255, 255, 0.993)",
        }}
      >
                  <a href="https://github.com/H4K3R13" target="_blank">
            <img src={turtleLogo} className="logo" alt="turtle logo" />
          </a>
        Sign In Using Google
      </Button>
    </>
  );
};

export default Login;
