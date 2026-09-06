import axios from "axios";

const BASE_URL = "https://kurtii-api.vercel.app/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("kc_token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// Orders
export const getAllOrders = () =>
  axios.get(`${BASE_URL}/orders`, getAuthHeader()).then((r) => r.data.data || r.data);

export const updateStatus = (id, status) =>
  axios.patch(`${BASE_URL}/orders/${id}/status`, { status }, getAuthHeader()).then((r) => r.data);

export const deleteOrder = (id) =>
  axios.delete(`${BASE_URL}/orders/${id}`, getAuthHeader()).then((r) => r.data);

// Subscribers & Messages
export const getAllSubscribers = () =>
  axios.get(`${BASE_URL}/subscribe`, getAuthHeader()).then((r) => r.data.data || r.data);

export const getAllMessages = () =>
  axios.get(`${BASE_URL}/contact`, getAuthHeader()).then((r) => r.data.data || r.data);

// Products
export const getAllProducts = () =>
  axios.get(`${BASE_URL}/products`).then((r) => r.data.data || r.data);

export const createProduct = (productData) =>
  axios.post(`${BASE_URL}/products`, productData, getAuthHeader()).then((r) => r.data);

export const updateProduct = (id, productData) =>
  axios.put(`${BASE_URL}/products/${id}`, productData, getAuthHeader()).then((r) => r.data);

export const deleteProduct = (id) =>
  axios.delete(`${BASE_URL}/products/${id}`, getAuthHeader()).then((r) => r.data);