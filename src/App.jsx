import Navbar from "./components/Navbar";
import Form from "./components/Form";
import SearchBar from "./components/SearchBar";
import "./App.css";
import Login from "./components/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      {/* <GoogleOAuthProvider clientId="791186457310-dokutkb0uekegquccairo5fq46qe8aoa.apps.googleusercontent.com"> */}
      <Login />
      {/* </GoogleOAuthProvider> */};
    </>
  );
}

export default App;
