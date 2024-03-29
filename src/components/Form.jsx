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

  console.log("User in From", props.user);

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
        const userString = localStorage.getItem("turtleUser");
        const user = JSON.parse(userString);
        console.log("user localStorage", user, "user.id", user.id);

        const response = await getTags(user.id);
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
    setUser(props.user);
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
    const userString = localStorage.getItem("turtleUser");
    const user = JSON.parse(userString);
    console.log(
      "user localStorage in addTag() and submitBookmarl() calling",
      user,
      "user.userID",
      user.userID
    );
    await addTag(addnewTags, user.userID);

    // Wait for 1 seconds
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Get the existing tags
    const existingTags = selectedTags.filter((tag) => tags.includes(tag.value));
    console.log("Existing Tags", existingTags);

    const finalTags = selectedTags.map((tag) => tag.value);
    console.log("Tags for submission", finalTags);

    const data = {
      Url: url,
      Tags: finalTags,
      user: user.userID,
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
          InputLabelProps={{
            style: { color: "green" },
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: ".5rem",
            marginTop: "1rem",
          }}
        />
        <Select
          isMulti
          options={tags.map((tag) => ({ value: tag, label: tag }))}
          onChange={handleTagsChange}
          value={selectedTags}
          onKeyDown={handleKeyDown}
          placeholder="Type or select tags..."
          sx={{ borderRadius: ".5rem", marginTop: "0.5rem" }}
          styles={{
            control: (provided) => ({
              ...provided,
              fontSize: "16px", // Increase font size
              minHeight: "50px", // Increase select box height
            }),
            option: (provided) => ({
              ...provided,
              fontSize: "16px", // Increase font size
              padding: "10px", // Increase padding
            }),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "green",
            borderRadius: ".5rem",
            marginTop: "0.5rem",
          }}
        >
          Add
        </Button>
      </form>
    </>
  );
};

export default Form;
