import axios from "axios";

const API_URL = "https://kurtii-api.vercel.app/api/orders";

// Always fetch fresh token dynamically
const getAuthHeader = () => {
  const token = localStorage.getItem("kc_token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const getAllOrders = () =>
  axios.get(API_URL, getAuthHeader()).then((r) => r.data.data || r.data);

export const updateStatus = (id, status) =>
  axios
    .patch(`${API_URL}/${id}/status`, { status }, getAuthHeader())
    .then((r) => r.data);

export const deleteOrder = (id) =>
  axios.delete(`${API_URL}/${id}`, getAuthHeader()).then((r) => r.data);

export const getAllSubscribers = () =>
  axios
    .get("https://kurtii-api.vercel.app/api/subscribe", getAuthHeader())
    .then((r) => r.data.data || r.data);

export const getAllMessages = () =>
  axios
    .get("https://kurtii-api.vercel.app/api/contact", getAuthHeader())
    .then((r) => r.data.data || r.data);

export const getAllProducts = () =>
  axios
    .get("https://kurtii-api.vercel.app/api/products")
    .then((r) => r.data.data || r.data);