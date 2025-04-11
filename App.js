import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import TaskInput from "./components/TaskInput";
import { StatusBar } from "expo-status-bar";
import TasksContextProvider from "./store/context/tasks-context";
import TasksList from "./components/TasksList";

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
      <TasksContextProvider>
        <View style={styles.appContainer}>
          <Button title="Add Task" color="#a065ec" onPress={showModal} />
          <TaskInput
            visible={modalIsVisible}
            addTaskHandler={addTaskHandler}
            onClose={onCloseHandler}
          />
        </View>
        <TasksList />
      </TasksContextProvider>
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
