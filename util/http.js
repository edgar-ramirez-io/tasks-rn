import axios from "axios";

const token = ""; // TODO: set it from /signin
const BACKEND_URL = "http://localhost:3000";
const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export async function createTask({ title, description }) {
  const response = await axios.post(
    `${BACKEND_URL}/tasks`,
    {
      title,
      description,
    },
    axiosConfig
  );

  return response.data;
}

export async function getTasks() {
  const response = await axios.get(`${BACKEND_URL}/tasks`, axiosConfig);

  const tasks = [];
  for (const value in response.data) {
    const { id, description, status, title } = response.data[value];
    tasks.push({
      description,
      id,
      status,
      title,
    });
  }

  return tasks;
}
