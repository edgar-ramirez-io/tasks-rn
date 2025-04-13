import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import TaskInput from "./components/TaskInput";
import { StatusBar } from "expo-status-bar";
import TasksList from "./components/TasksList";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function showModal() {
    setModalIsVisible(true);
  }

  function addTaskHandler() {
    onCloseHandler();
  }

  function onCloseHandler() {
    setModalIsVisible(false);
  }

  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <View style={styles.appContainer}>
          <Button title="Add Task" color="#a065ec" onPress={showModal} />
          <TaskInput
            visible={modalIsVisible}
            addTaskHandler={addTaskHandler}
            onClose={onCloseHandler}
          />
        </View>
        <TasksList />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
});
