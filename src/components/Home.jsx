import Navbar from "./Navbar";
import Form from "./Form";
import SearchBar from "./SearchBar";

const Home = (props) => {
  return (
    <>
      <div style={{ textAlign: "center", padding: "8px" }}>
      <Navbar user={props.user}/>
        <Form user={props.user}/>
        <SearchBar />
      </div>
    </>
  );
};

export default Home;
