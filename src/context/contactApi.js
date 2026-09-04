import axios from "axios";

const API_URL = "https://kurtii-api.vercel.app/api/contact";

export const sendContactMessage = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};