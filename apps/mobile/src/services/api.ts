import axios from 'axios';

const API_URL = 'http://localhost:5001';

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = async (username: string, password: string) => {
  const response = await api.post('/auth/register', {username, password});
  return response.data;
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth/login', {username, password});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTodos = async (token: string) => {
  const response = await api.get('/todos', {
    headers: {Authorization: `Bearer ${token}`},
  });
  return response.data;
};

export const addTodo = async (title: string, token: string) => {
  const response = await api.post(
    '/todos',
    {title},
    {headers: {Authorization: `Bearer ${token}`}},
  );
  return response.data;
};

export const updateTodo = async (
  id: number,
  completed: boolean,
  token: string,
) => {
  const response = await api.put(
    '/todos',
    {id, completed},
    {headers: {Authorization: `Bearer ${token}`}},
  );
  return response.data;
};
