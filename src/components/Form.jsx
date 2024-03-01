import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "react-select";
import { getTags, submitBookmark } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [url, setUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [newTag, setNewTag] = useState("");

  console.log("KEY", import.meta.env.VITE_SECRET);

  // //Gets currents Tabs URL
  async function getCurrentTab() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;
      console.log("url in react", url);
      setActiveTab(url);
      setUrl(url);
    });
  }

  useEffect(() => {
    //gets all tags from Baserow
    const fetchData = async () => {
      try {
        const response = await getTags();
        console.log("Tags Response", response);
        const tagsData = response.data.results.map((row) => row.Name);
        const uniqueTags = Array.from(new Set(tagsData.flat()));
        setTags(uniqueTags);
      } catch (error) {
        console.error("Error fetching user Tags", error);
      }
    };

    getCurrentTab();
    //setActiveTab("https://example.com");
    fetchData();
  }, []);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleTagsChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("URL:", url);
    //const tags = selectedTags.map((tag) => tag.value);
    const tags = selectedTags.map((tag) => tag.value);
    if (newTag.trim() !== "") {
      tags.push(newTag.trim());
    }
    console.log("Tags", tags);
    const data = {
      Url: url,
      Tags: tags,
    };
    console.log("Data", data);
    try {
      await submitBookmark(data);
      toast.success("Bookmark added successfully!");
    } catch (error) {
      console.error("Error adding bookmark", error);
      toast.error("Failed to add bookmark");
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <TextField
          label="URL"
          variant="outlined"
          value={activeTab}
          onLoad={handleUrlChange}
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
    </>
  );
};

export default Form;
