import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getURL } from "./api";
import { Typography } from "@mui/material";

const SearchBar = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredUrls, setFilteredUrls] = useState([]);
  const [tagOptions, setTagOptions] = useState();
  const [data, setData] = useState();
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
        const data = await getURL();
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
  }, []);

  return (
    <div>
      <Typography style={{ color: "white" }}>
      Select the required tags to explore your bookmarks!
    </Typography>
      <Select
        isMulti
        options={tagOptions}
        onChange={handleTagsChange}
        value={selectedTags}
        placeholder="Select tags"
      />
      <ul
        style={{
          backgroundColor: "lightgray",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
 {selectedTags.length === 0 ? (
      <li style={{ color: "gray" }}>Select tags</li>
    ) : (
      filteredUrls.map((item) => (
        <li key={item.id}>
          <a href={item.Url} target="_blank" rel="noreferrer">
            <strong>{item.Url}</strong> -{" "}
            {item.Tags.map((tag) => tag.value).join(", ")}
          </a>
        </li>
      ))
    )}
      </ul>
    </div>
  );
};

export default SearchBar;
