import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "react-select";
import axios from "axios";
import { s } from "vite/dist/node/types.d-jgA8ss1A";

const Form = () => {
  const [url, setUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTab, setActiveTab] = useState("")
  console.log("KEY", import.meta.env.VITE_SECRET);

  //Gets currents Tabs URL
  async function getCurrentTab() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;
      console.log("url in react", url);
      setActiveTab(url)
    });
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "https://api.baserow.io/api/database/rows/table/260023/?user_field_names=true",
          headers: {
            Authorization: `Token ${import.meta.env.VITE_SECRET}`,
          },
        });
        console.log("reponse", response);
        const tagsData = response.data.results.map((row) => row.Name);
        const uniqueTags = Array.from(new Set(tagsData.flat()));
        setTags(uniqueTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchData();
    getCurrentTab()
  }, []);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleTagsChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("URL:", url);
    console.log(
      "Tags:",
      //selectedTags.map((tag) => tag.value)
      selectedTags
    );
    const data = {
      "Url":url,
      "Tags":selectedTags
    }
    console.log("Data", data)
    // Add your logic here to handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="URL"
        variant="outlined"
        value={activeTab}
        onChange={handleUrlChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "white", borderRadius: ".5rem" }}
      />
      <Select
        isMulti
        options={tags.map((tag) => ({ value: tag, label: tag }))}
        onChange={handleTagsChange}
        value={selectedTags}
        sx={{ borderRadius: ".5rem" }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "green",
          borderRadius: ".5rem",
          margin: ".2rem",
        }}
      >
        Add
      </Button>
    </form>
  );
};

export default Form;