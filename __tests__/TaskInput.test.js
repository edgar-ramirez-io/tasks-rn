import { render } from "@testing-library/react-native";
import TaskInput from "../components/TaskInput";
import { configureStore } from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([]);

describe("<TaskInput />", () => {
  test("Text renders correctly", () => {
    // Arrange
    const initialState = {
      tasks: [],
    };
    const store = mockStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <TaskInput />
      </Provider>
    );
    // Act

    // Assert
    getByText("Add Task", { exact: false });
    getByText("Cancel", { exact: false });
  });
});
