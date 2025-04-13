import { useContext, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { TasksContext } from "../store/context/tasks-context";
import { createTask } from "../util/http";

function TaskInput({ addTaskHandler: addTaskHandlerProps, onClose, visible }) {
  const tasksCtx = useContext(TasksContext);
  const [enteredTaskText, setEnteredTaskText] = useState("");

  function taskInputHandler(text) {
    setEnteredTaskText(text);
  }

  async function addTaskHandler() {
    const task = {
      title: enteredTaskText,
      description: "description RN",
    };
    try {
      const taskCreated = await createTask(task);
      addTaskHandlerProps();
      tasksCtx.addTask({ ...task, id: taskCreated.id });
      setEnteredTaskText("");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  function onClose() {
    onClose();
    setEnteredTaskText("");
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
        />
        <TextInput
          value={enteredTaskText}
          style={styles.textInput}
          placeholder="Enter your next task here..."
          onChangeText={taskInputHandler}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onClose} color="#f31282" />
          </View>
          <View style={styles.button}>
            <Button title="Add task" onPress={addTaskHandler} color="#b180f0" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 16,
    backgroundColor: "#311b6b",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    width: "40%",
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});

export default TaskInput;
