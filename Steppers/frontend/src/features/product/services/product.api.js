import axios from "axios";

const productApi = axios.create({
  baseURL: "/api/product",
  withCredentials: true,
});

export const createProduct = async (formData) => {
  const response = await productApi.post("/create", formData);
  return response.data
};

export const fetchProducts = async () => {
    const response = await productApi.get('/')
    return response.data
}
