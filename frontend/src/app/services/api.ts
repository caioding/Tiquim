import axios from "axios";

const api = axios.create({
  baseURL: "https://ranekapi.origamid.dev/json/api",
});

export default api;
