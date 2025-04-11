import { Pressable, StyleSheet, Text, View } from "react-native";

function TaskItem(props) {
  return (
    <View style={styles.taskItem}>
      <Pressable
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={({ pressed }) => pressed && styles.pressedTask}
      >
        <Text style={styles.itemText}>{props.text}</Text>
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
