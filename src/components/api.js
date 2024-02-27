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

export const submitBookmark = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_URL}api/database/rows/table/260068/?user_field_names=true`,
      headers: {
        Authorization: `Token ${import.meta.env.VITE_SECRET}`,
      },
      data: data,
    });
    console.log("submission response", response);
  } catch (error) {
    console.error("Error submitted bookmark", error);
  }
};

export const getURL = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_URL}api/database/rows/table/260068/?user_field_names=true`,
      headers: {
        Authorization: `Token ${import.meta.env.VITE_SECRET}`,
      },
    });
    console.log("url response", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching urls:", error);
  }
};
