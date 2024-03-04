import Navbar from "./components/Navbar";
import Form from "./components/Form";
import SearchBar from "./components/SearchBar";
import "./App.css";
import Login from "./components/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="791186457310-ia4gebdepqh4h8g9ci1n85e36tg8jlrm.apps.googleusercontent.com">
        <Login />
      </GoogleOAuthProvider>
      ;
    </>
  );
}

export default App;
