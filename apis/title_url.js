import axios from "axios";
import cheerio from "cheerio"

const fetchPageTitle = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    return $("title").text();
  } catch (error) {
    console.error("Error fetching webpage title:", error);
    return "Untitled"; // Default title if fetching fails
  }
};

const url =
  "https://stackoverflow.com/questions/25225964/is-there-a-way-to-focus-on-a-specific-tab-in-chrome-via-plugin";
console.log("title:", await fetchPageTitle(url));
