import axios from "axios";

const token = ""; // TODO: set it from /signin
const BACKEND_URL = "http://localhost:3000";
const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export async function createTask(data) {
  await axios.post(
    `${BACKEND_URL}/tasks`,
    {
      title: data.title,
      description: data.description,
    },
    axiosConfig
  );
}

export async function getTasks() {
  const response = await axios.get(`${BACKEND_URL}/tasks`, axiosConfig);

  const tasks = [];
  for (const value in response.data) {
    const data = response.data[value];
    tasks.push({
      description: data.description,
      id: data.id,
      status: data.status,
      title: data.title,
    });
  }

  return tasks;
}
