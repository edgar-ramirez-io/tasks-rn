import { createContext, useReducer } from "react";

function taskReducer(state, action) {
  if (action.type === "ADD_TASK") {
    return { ...state, tasks: [...state.tasks, action.payload] };
  }

  if (action.type === "DELETE_TASK") {
    const updatedTasks = [
      ...state.tasks.filter((task) => task.id !== action.payload),
    ];
    return {
      ...state,
      tasks: updatedTasks,
    };
  }

  if (action.type === "REPLACE_TASKS") {
    return { ...state, tasks: [...action.payload] };
  }

  return state;
}

export const TasksContext = createContext({
  tasks: [],
  addTask: (task) => {},
  removeTask: (id) => {},
  updateTasks: () => {},
});

function TasksContextProvider({ children }) {
  const [tasksState, tasksDispatch] = useReducer(taskReducer, { tasks: [] });

  function addTask(task) {
    tasksDispatch({ type: "ADD_TASK", payload: task });
  }

  function removeTask(id) {
    tasksDispatch({ type: "DELETE_TASK", payload: id });
  }

  function updateTasks(tasks) {
    tasksDispatch({ type: "REPLACE_TASKS", payload: tasks || [] });
  }

  const value = {
    tasks: tasksState.tasks,
    addTask: addTask,
    removeTask: removeTask,
    updateTasks: updateTasks,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export default TasksContextProvider;
