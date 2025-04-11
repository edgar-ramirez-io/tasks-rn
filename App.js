import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import TaskItem from "./components/TaskItem";
import TaskInput from "./components/TaskInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function showModal() {
    setModalIsVisible(true);
  }

  function addTaskHandler(enteredTaskText) {
    setTasks((oldTasks) => [
      ...oldTasks,
      { text: enteredTaskText, id: `${Date.now()}-${Math.random()}` },
    ]); // (oldTasks) recommended by react
    onCloseHandler();
  }

  function deleteTaskHandler(id) {
    setTasks((oldTasks) => {
      return oldTasks.filter((task) => {
        return id !== task.id;
      });
    });
  }

  function onCloseHandler() {
    setModalIsVisible(false);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title="Add Task" color="#a065ec" onPress={showModal} />
        <TaskInput
          visible={modalIsVisible}
          addTaskHandler={addTaskHandler}
          onClose={onCloseHandler}
        />
        <View style={styles.tasksContainer}>
          {tasks.length == 0 && <Text style={styles.noTasks}>No tasks</Text>}
          {tasks.length > 0 && (
            <FlatList
              data={tasks}
              keyExtractor={(item, index) => {
                return item.id;
              }}
              renderItem={(itemData) => {
                return (
                  <TaskItem
                    text={itemData.item.text}
                    onDeleteItem={deleteTaskHandler}
                    id={itemData.item.id}
                  />
                );
              }}
            />
          )}
        </View>
      </View>
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
  tasksContainer: {
    flex: 5,
  },
  noTasks: {
    backgroundColor: "gray",
    padding: 8,
    margin: 8,
    borderRadius: 6,
    color: "white",
  },
});
