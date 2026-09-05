import axios from "axios";
const API_URL = "https://kurtii-api.vercel.app/api/orders";

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("kc_token")}` },
});

export const getAllOrders = () => axios.get(API_URL, authHeader()).then((r) => r.data);
export const updateStatus = (id, status) =>
  axios.patch(`${API_URL}/${id}/status`, { status }, authHeader()).then((r) => r.data);

export const deleteOrder = (id) =>
  axios.delete(`${API_URL}/${id}`, authHeader()).then((r) => r.data);