import axios from "axios";
import { jwtDecode } from "jwt-decode";
const API_URL = "https://api.baserow.io/";

// to fetch tags
export const getTags = async (id) => {
  console.log("getTags id", id);
  try {
    const response = await axios({
      method: "GET",
      url: `${API_URL}api/database/rows/table/260023/?user_field_names=true&filters=%7B%22filter_type%22%3A%22AND%22%2C%22filters%22%3A%5B%7B%22type%22%3A%22link_row_has%22%2C%22field%22%3A%22user%22%2C%22value%22%3A%22${id}%22%7D%5D%2C%22groups%22%3A%5B%5D%7D`,
      headers: {
        Authorization: `Token ${import.meta.env.VITE_SECRET}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching tags:", error);
  }
};

// to add new url to bookmark
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
    return response.status;
  } catch (error) {
    console.error("Error submitted bookmark", error);
  }
};

// to get url
export const getURL = async (id) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_URL}api/database/rows/table/260068/?user_field_names=true&filters=%7B%22filter_type%22%3A%22AND%22%2C%22filters%22%3A%5B%7B%22type%22%3A%22link_row_has%22%2C%22field%22%3A%22user%22%2C%22value%22%3A%22${id}%22%7D%5D%2C%22groups%22%3A%5B%5D%7D
      `,
      headers: {
        Authorization: `Token ${import.meta.env.VITE_SECRET}`,
      },
    });
    console.log("getURL response", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching urls:", error);
  }
};

// to create new tags
export const addTag = async (tag, userID) => {
  await tag.forEach((element) => {
    try {
      const response = axios({
        method: "POST",
        url: `${API_URL}api/database/rows/table/260023/?user_field_names=true`,
        headers: {
          Authorization: `Token ${import.meta.env.VITE_SECRET}`,
        },
        data: {
          Name: element,
          urls: [],
          user: userID,
        },
      });
      console.log("submission response for tags", response);
    } catch (error) {
      console.error("Error submitted bookmark", error);
    }
  });
};

// to add userID from Google OAuth
const addUser = async (userID) => {
  console.log("userID", userID);
  try {
    const response = await axios({
      method: "GET",
      url: `${API_URL}api/database/rows/table/262939/?user_field_names=true&filter__field_1868162__equal=${userID}`,
      headers: {
        Authorization: `Token ${import.meta.env.VITE_SECRET}`,
      },
    });
    console.log("Checking User", response, response.status);

    if (response.data.count === 0) {
      // User not found, add the user
      const addUserResponse = await axios({
        method: "POST",
        url: `${API_URL}api/database/rows/table/262939/?user_field_names=true`,
        headers: {
          Authorization: `Token ${import.meta.env.VITE_SECRET}`,
          "Content-Type": "application/json",
        },
        data: {
          userID: userID,
        },
      });
      console.log("addUser Response", addUserResponse, addUserResponse.status);

      // Return the newly added user's ID
      return { id: addUserResponse.data.id, userID: userID };
    } else {
      // User already exists, return the existing user's ID
      const existingUserID = response.data.results[0].id;
      console.log("Existing User ID", existingUserID);
      return { id: existingUserID, userID: userID };
    }
  } catch (error) {
    console.error("Error adding or checking user:", error);
    throw error; // Re-throw the error to propagate it
  }
};

export const login = () => {
  return new Promise((resolve, reject) => {
    var userID = "";
    var manifest = chrome.runtime.getManifest();
    var clientId = encodeURIComponent(manifest.oauth2.client_id);
    var scopes = encodeURIComponent("openid");
    var redirectUri = encodeURIComponent(
      `https://bacepobpbmbcebihpgkjkpclkclaigjg.chromiumapp.org`
    );
    console.log("ClientId", clientId);
    var url =
      "https://accounts.google.com/o/oauth2/v2/auth" +
      "?client_id=" +
      clientId +
      "&response_type=id_token" +
      "&access_type=offline" +
      "&nonce=testnonce" +
      "&redirect_uri=" +
      redirectUri +
      "&scope=" +
      scopes;
    console.log("URL to Oauth", url);
    chrome.identity.launchWebAuthFlow(
      {
        url: url,
        interactive: true,
      },
      async function (redirectedTo) {
        if (chrome.runtime.lastError) {
          // Example: Authorization page could not be loaded.
          console.log(chrome.runtime.lastError.message);
          reject(chrome.runtime.lastError.message);
        } else {
          var response = redirectedTo.split("#", 2)[1];
          console.log("OAuth Response", response);
          var credentialResponse = jwtDecode(response);
          console.log(
            "credential Response",
            credentialResponse,
            credentialResponse.sub
          );
          userID = credentialResponse.sub;
          console.log("userID", userID);
          try {
            const result = await addUser(userID);
            localStorage.setItem('turtleUser', JSON.stringify(result));
            const storedResult = localStorage.getItem("turtleUser")
            console.log("User added:", result, "Stored Item", storedResult);
            resolve(result); // Resolve with the result from addUser
          } catch (error) {
            console.error("Error adding user:", error);
            reject(error); // Reject with the error from addUser
          }
        }
      }
    );
  });
};
