import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const TODOS_URL = `${API_BASE_URL}/todos`;
const AUTH_URL = `${API_BASE_URL}/auth`;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUser = async (email, password) => {
    return await axios.post(`${AUTH_URL}/login`, { email, password });
};

export const registerUser = async (email, password) => {
    return await axios.post(`${AUTH_URL}/register`, { email, password });
};

export const fetchTodos = async () => {
    return await axios.get(TODOS_URL);
};

export const createTodo = async (text) => {
    return await axios.post(TODOS_URL, { text });
};

export const updateTodo = async (id, completed) => {
    return await axios.put(`${TODOS_URL}/${id}`, { completed });
};

export const deleteTodo = async (id) => {
    return await axios.delete(`${TODOS_URL}/${id}`);
};
