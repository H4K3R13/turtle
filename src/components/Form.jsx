import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select, { components } from "react-select";
import { getTags, submitBookmark, addTag } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = (props) => {
  const [url, setUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [user, setUser] = useState();

  const userid = props.user
  console.log("User in From", props.user, userid)

  //Gets current Tab's URL
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
    //setActiveTab("https://example.com"); //used during development 
    fetchData();
  }, []);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleTagsChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTagValue = event.target.value.trim();
      if (newTagValue !== "") {
        setSelectedTags([
          ...selectedTags,
          { value: newTagValue, label: newTagValue },
        ]);
        //setNewTag("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("URL:", url);

    // Get the newly added tags
    const newTags = selectedTags.filter((tag) => !tags.includes(tag.value));
    const addnewTags = newTags.map((tag) => tag.value);
    console.log("New Tags", addnewTags);
    //Add api call to do create new tags
    await addTag(addnewTags);

    // Wait for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Get the existing tags
    const existingTags = selectedTags.filter((tag) => tags.includes(tag.value));
    console.log("Existing Tags", existingTags);

    const finalTags = selectedTags.map((tag) => tag.value);
    console.log("Tags for submission", finalTags);

    const data = {
      Url: url,
      Tags: finalTags,
    };
    console.log("Data", data);
    const status = await submitBookmark(data);
    if (status == 200) {
      toast.success("Bookmark added successfully!");
    } else {
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
          onKeyDown={handleKeyDown}
          placeholder="Type or select tags..."
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
