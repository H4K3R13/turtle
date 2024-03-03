import Navbar from "./Navbar";
import Form from "./Form";
import SearchBar from "./SearchBar";

const Home = () => {
  return (
    <>
      <div style={{ textAlign: "center", padding: "8px" }}>
        <Form />
        <SearchBar />
      </div>
    </>
  );
};

export default Home;
