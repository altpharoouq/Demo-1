import axios from "axios";

const options = {
  baseURL: process.env.REACT_APP_PROVENIR_BASE_URL,
  headers: {
    "x-api-key": process.env.REACT_APP_PROVENIR_API_KEY,
  },
};

const client = axios.create(options);

export default client;
