import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "react-select";
import axios from "axios";
import {getTags, getCurrentTab } from "./api"

const Form = () => {
  const [url, setUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  console.log("KEY", import.meta.env.VITE_SECRET);



  useEffect(() => {

    // gets all the tags from Baserow
    const fetchData = async () => {
      try {
        const response = await getTags();
        console.log("Tags Response", response)
        const tagsData = response.data.results.map((row) => row.Name);
        const uniqueTags = Array.from(new Set(tagsData.flat()));
        setTags(uniqueTags);
      } catch (error) {
        console.error('Error fetching user Tags', error);
      }
    }

    // gets the current active tab
    const getTab = async () => {
      const url = await getCurrentTab()
      setActiveTab(url)
    }

    fetchData();
    getTab();
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
      Url: url,
      Tags: selectedTags,
    };
    console.log("Data", data);
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
