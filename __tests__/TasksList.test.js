import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import TasksList from "../components/TasksList";
import { getTasks } from "../util/http";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

jest.mock("../util/http");

describe("<TasksList />", () => {
  const mockStore = configureStore([]);
  const initialState = {
    tasks: {
      tasks: [
        { id: 1, title: "Task 1" },
        { id: 2, title: "Task 2" },
      ],
    },
  };
  const store = mockStore(initialState);

  test("Renders 'No tasks' when there are no tasks", () => {
    const emptyState = {
      tasks: {
        tasks: [],
      },
    };
    const emptyStore = mockStore(emptyState);

    const { getByText } = render(
      <Provider store={emptyStore}>
        <TasksList />
      </Provider>
    );

    expect(getByText("No tasks")).toBeTruthy();
  });

  test("Renders tasks correctly", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <TasksList />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText("Task 1")).toBeTruthy();
      expect(getByText("Task 2")).toBeTruthy();
    });
  });

  xtest("Displays error message on fetch failure", async () => {
    getTasks.mockRejectedValue(new Error());

    // TODO: mock useSelector to return []
    const { getByText } = render(
      <Provider store={store}>
        <TasksList />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText("No tasks")).toBeTruthy();
    });
  });
});
