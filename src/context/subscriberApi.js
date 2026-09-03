import axios from "axios";

const API_URL = "https://kurtii-api.vercel.app/api/subscribe";

export const subscribeEmail = async (email) => {
  const response = await axios.post(API_URL, { email });
  return response.data;
};