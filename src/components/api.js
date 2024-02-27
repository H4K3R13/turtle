import axios from "axios";

const API_URL = "https://api.baserow.io/";

export const getTags = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_URL}api/database/rows/table/260023/?user_field_names=true`,
      headers: {
        Authorization: `Token ${import.meta.env.VITE_SECRET}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching tags:", error);
  }
};

export const getCurrentTab = async() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;
      console.log("url in react", url);
      return url
      setActiveTab(url);
    });
  }