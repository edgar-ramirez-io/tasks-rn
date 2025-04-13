import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload.task);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload.id);
    },
    updateTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
  },
});

export const addTask = tasksSlice.actions.addTask;
export const removeTask = tasksSlice.actions.removeTask;
export const updateTasks = tasksSlice.actions.updateTasks;

export default tasksSlice.reducer;
