import Navbar from "./components/Navbar";
import Form from "./components/Form";
import SearchBar from "./components/SearchBar";
import "./App.css";
import { getURL } from "./components/api";

const data = {
  count: 5,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      order: "1.00000000000000000000",
      Url: "facebook.com",
      Tags: [
        {
          id: 1,
          value: "Social",
        },
        {
          id: 4,
          value: "Tech",
        },
        {
          id: 6,
          value: "Comedy",
        },
      ],
    },
    {
      id: 2,
      order: "2.00000000000000000000",
      Url: "espn.com",
      Tags: [
        {
          id: 2,
          value: "News",
        },
      ],
    },
    {
      id: 3,
      order: "3.00000000000000000000",
      Url: "ajio.com",
      Tags: [
        {
          id: 5,
          value: "Shop",
        },
      ],
    },
    {
      id: 4,
      order: "4.00000000000000000000",
      Url: "https://baserow.io",
      Tags: [
        {
          id: 1,
          value: "Social",
        },
      ],
    },
    {
      id: 6,
      order: "6.00000000000000000000",
      Url: "https://example.io",
      Tags: [
        {
          id: 4,
          value: "Tech",
        },
        {
          id: 5,
          value: "Shop",
        },
      ],
    },
  ],
};

function App() {
  return (
    <>
      <Navbar />
      <Form />
      <SearchBar />
    </>
  );
}

export default App;
