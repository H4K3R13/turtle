import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getURL } from "./api";

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
        const tagOptions = data.results.flatMap((item) =>
          item.Tags.map((tag) => ({
            id: tag.id,
            value: tag.value,
            label: tag.value,
          }))
        );
        setTagOptions(tagOptions);
      } catch (error) {
        console.error("Error fetching user Tags", error);
      }
    };

    //setActiveTab("https://example.com");
    fetchData();
  }, []);

  // const data = getURL()
  // console.log("url data in Searchbar", data)
  // const tagOptions = data.results.flatMap((item) => item.Tags.map((tag) => ({ id: tag.id, value: tag.value, label: tag.value })));

  return (
    <div>
      <Select
        isMulti
        options={tagOptions}
        onChange={handleTagsChange}
        value={selectedTags}
        placeholder="Select tags"
      />
      <ul>
        {filteredUrls.map((item) => (
          <li key={item.id}>
            <a href={item.Url} target="_blank" rel="noreferrer">
              {item.Url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
