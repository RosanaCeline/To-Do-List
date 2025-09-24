import axios from "axios";

const API_URL = "http://localhost:8080/tarefas";

export const listTasks = async (userId) => {
  const response = await axios.get(API_URL, {
    params: { userId },
  });
  return response.data;
};

export const createTask = async (task, userId) => {
  const payload = { ...task, userId };
  const response = await axios.post(API_URL, payload);
  return response.data;
};

export const updateTask = async (taskId, task, userId) => {
  const payload = { ...task, userId };
  const response = await axios.put(`${API_URL}/${taskId}`, payload);
  return response.data;
};

export const toggleCompleted = async (taskId, completed) => {
  await axios.patch(`${API_URL}/${taskId}/concluir`, null, {
    params: { completed },
  });
};

export const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`);
};
