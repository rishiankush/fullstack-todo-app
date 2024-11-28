import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const API_URL = "http://localhost:5001";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { logout } = useAuth();
      logout();
      alert("Session expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export const loginUser = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

export const registerUser = async (username: string, password: string) => {
  console.log("request object ***** ", username, password);
  try {
    const response = await api.post("/auth/register", { username, password });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchTodos = async (token: string) => {
  const response = await api.get("/todos", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addTodo = async (title: string, token: string) => {
  const response = await api.post(
    "/todos",
    { title },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const updateTodo = async (
  id: number,
  completed: boolean,
  token: string
) => {
  const response = await api.put(
    "/todos",
    { id, completed },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export default api;
