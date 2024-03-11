import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Login from "./Login";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import turtleLogo from "/turtle.png";


const Navbar = () => {

  const handleLogout = () => {
    localStorage.removeItem("turtleUser")
    console.log("Logout");
    window.close();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#242424" , borderRadius:"1rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href="https://github.com/H4K3R13" target="_blank">
            <img src={turtleLogo} className="logo" alt="turtle logo" />
          </a>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            turtle
          </Typography>
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
          <Box sx={{ flexGrow: 0 }}>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
