import axios from "axios";
const API_URL = "https://kurtii-api.vercel.app/api/auth";

export const loginUser = (email, password) =>
  axios.post(`${API_URL}/login`, { email, password }).then((r) => r.data);