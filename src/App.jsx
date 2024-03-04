import Navbar from "./components/Navbar";
import Form from "./components/Form";
import SearchBar from "./components/SearchBar";
import "./App.css";
import Login from "./components/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="791186457310-61ggudu64h8i3t0p70an06b0mik2b0pa.apps.googleusercontent.com">
        <Login />
      </GoogleOAuthProvider>
      ;
    </>
  );
}

export default App;
