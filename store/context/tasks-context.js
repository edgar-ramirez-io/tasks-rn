import { createContext, useState } from "react";

export const TasksContext = createContext({
  tasks: [],
  addTask: (task) => {},
  removeTask: (id) => {},
  updateTasks: () => {},
});

function TasksContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  function addTask(task) {
    setTasks((oldTasks) => [...oldTasks, task]);
  }

  function removeTask(id) {
    setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id));
  }

  function updateTasks(tasks) {
    setTasks(tasks);
  }

  const value = {
    tasks: tasks,
    addTask: addTask,
    removeTask: removeTask,
    updateTasks: updateTasks,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export default TasksContextProvider;
