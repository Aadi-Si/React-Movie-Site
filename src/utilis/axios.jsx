import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjY5YzMyOTI0Mzc3NjMxZmY5ZGQ1M2MzMzgxZjIyNSIsIm5iZiI6MTc0Mjk5MzA2MC4wNjA5OTk5LCJzdWIiOiI2N2UzZjZhNDBlZTUzZDRlNzFmMGJkMWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YWLwIcsh6afgylrUPNpkJiBun8WE3kTc9kqITxQrrE8",
  },
});
export default instance;
