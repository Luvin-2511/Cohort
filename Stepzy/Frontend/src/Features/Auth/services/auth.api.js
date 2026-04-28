import axios from "axios";

const api = axios.create({
  baseURL: "/api/auth",
});

export const login = async ({ email, password }) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

export const Register = async ({
  fullname,
  contactNumber,
  email,
  password,
  role
}) => {
  try {
    const response = await api.post("/register", {
      fullname,
      contactNumber,
      email,
      password,
      role
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Registration failed");
  }
};
