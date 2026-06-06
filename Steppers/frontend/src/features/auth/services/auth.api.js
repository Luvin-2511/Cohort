import axios from "axios";

const authApi = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export const register = async ({ email, name, password, contact, role }) => {
  const response = await authApi.post("/register", {
    email,
    name,
    password,
    contact,
    role,
  });
  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await authApi.post("/login", {
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  const response = await authApi.post("/logout");
  return response.data;
};

export const getMe = async () => {
  const response = await authApi.post("/me");
  return response.data;
};
