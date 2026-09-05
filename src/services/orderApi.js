import axios from "axios";

const API_URL = "https://kurtii-api.vercel.app/api/orders";

export const getMyOrders = async (email) => {
  const response = await axios.get(`${API_URL}/my-orders`, {
    params: { email },
  });
  return response.data;
};