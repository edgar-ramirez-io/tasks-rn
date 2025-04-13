import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TasksContext } from "../store/context/tasks-context";

function TaskItem({ id, text }) {
  const tasksCtx = useContext(TasksContext);
  return (
    <View style={styles.taskItem}>
      <Pressable
        onPress={() => {
          tasksCtx.removeTask(id);
        }}
        style={({ pressed }) => pressed && styles.pressedTask}
      >
        <Text style={styles.itemText}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: "#5e0acc",
    padding: 8,
    margin: 8,
    borderRadius: 6,
  },
  itemText: {
    color: "white",
  },
  pressedTask: {
    opacity: 0.3,
  },
});

export default TaskItem;
