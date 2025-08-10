import axios from "axios";

// Change this to your backend URL when deployed
const API = axios.create({
  baseURL: "http://localhost:4000/api/portfolio"
});

export const getSummary = () => API.get("/summary");
export const getHoldings = () => API.get("/holdings");
export const getAllocation = () => API.get("/allocation");
export const getPerformance = () => API.get("/performance");
