import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { removeTask } from "../store/redux/tasksReducer";

function TaskItem({ id, text }) {
  const dispatch = useDispatch();
  return (
    <View style={styles.taskItem}>
      <Pressable
        onPress={() => {
          dispatch(removeTask({ id }));
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
