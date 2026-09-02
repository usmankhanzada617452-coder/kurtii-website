import axios from "axios";

const API_URL = "https://kurtii-api.vercel.app/api/products";

// Sare products backend se laao
export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  // Backend format: { success: true, data: [...] }
  return response.data.data;
};

// Ek specific product laao (ID se)
export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data;
};