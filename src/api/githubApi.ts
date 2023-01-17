import axios from "axios";

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: "Bearer " + process.env.VITE_REACT_APP_GITHUB_ACCESS_TOKEN,
  },
});
