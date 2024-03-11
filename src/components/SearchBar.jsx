import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getURL } from "./api";
import { Typography, Card, CardContent } from "@mui/material";
import { IconButton } from "@mui/material";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";

const SearchBar = (props) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredUrls, setFilteredUrls] = useState([]);
  const [tagOptions, setTagOptions] = useState();
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const handleTagsChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
    filterUrls(selectedOptions);
  };

  const filterUrls = (selectedOptions) => {
    const selectedTagsIds = selectedOptions.map((tag) => tag.id);
    const filteredUrls = data.results.filter((item) =>
      item.Tags.some((tag) => selectedTagsIds.includes(tag.id))
    );
    setFilteredUrls(filteredUrls);
  };

  useEffect(() => {
    //gets all urls from Baserow
    const fetchData = async () => {
      try {
        const data = await getURL(props.user.id);
        console.log("url data in Searchbar", data);
        setData(data);

        //Filter out duplicate tags
        const uniqueTags = new Set();
        const tagOptions = data.results
          .flatMap((item) =>
            item.Tags.map((tag) => {
              if (!uniqueTags.has(tag.value)) {
                uniqueTags.add(tag.value);
                return {
                  id: tag.id,
                  value: tag.value,
                  label: tag.value,
                };
              }
              return null;
            })
          )
          .filter((tag) => tag !== null);

        setTagOptions(tagOptions);
      } catch (error) {
        console.error("Error fetching user Tags", error);
      }
    };

    fetchData();
    setUser(props.user);
  }, []);

  return (
    <div style={{ marginTop: ".5rem" }}>
      <Typography style={{ color: "white" }}>
        Explore your bookmarks using tags!
      </Typography>
      <Select
        isMulti
        options={tagOptions}
        onChange={handleTagsChange}
        value={selectedTags}
        placeholder="Select tags"
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
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredUrls.map((item) => (
          <Card key={item.id} style={{ width: "95%", margin: "10px" }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                <a href={item.Url} target="_blank" rel="noreferrer">
                  {item.Url}
                </a>
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(item.Url);
                  }}
                  size="small"
                  aria-label="copy"
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Typography>
              <Typography color="textSecondary">
                Tags: {item.Tags.map((tag) => tag.value).join(", ")}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
