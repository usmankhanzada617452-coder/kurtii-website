const API_URL = process.env.REACT_APP_API_URL || "https://kurtii-api.vercel.app";

export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/api/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};