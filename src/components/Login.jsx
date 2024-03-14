import { useState } from "react";
import Home from "./Home";
import { Button } from "@mui/material";
import { login } from "./api";
import Navbar from "./Navbar";
import Form from "./Form";
import SearchBar from "./SearchBar";
import { useEffect } from "react";
import turtleLogo from "/turtle.png";
import GoogleIcon from "@mui/icons-material/Google";


import Typography from "@mui/material/Typography";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Use null as initial state for user

  const handleClick = async () => {
    try {
      const userID = await login();
      console.log("User ID Response", userID);
      const data = userID;
      localStorage.setItem("turtleUser", JSON.stringify(data)); // userID is getting saved 2 times.
      if (userID) {
        setUser(userID);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    const userID = localStorage.getItem("turtleUser");
    if (userID) {
      setUser(userID);
      setLoggedIn(true);
    }
  }, []);
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <a
          href="https://github.com/H4K3R13"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          <img
            src={turtleLogo}
            className="logo"
            alt="turtle logo"
            style={{ marginRight: "5px" }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            turtle
          </Typography>
        </a>
      </div>
      <Button
        onClick={handleClick}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "6px 12px",
          borderRadius: "10rem",
          cursor: "pointer",
          boxShadow: "0px 0px 5px 0px rgba(255, 255, 255, 0.993)",
          backgroundColor: "#fff",
          color: "#333",
          textTransform: "none", // Prevent text from being displayed in all caps
        }}
        startIcon={<GoogleIcon />}
      >
        Sign In With Google
      </Button>
    </>
  );
};

export default Login;
