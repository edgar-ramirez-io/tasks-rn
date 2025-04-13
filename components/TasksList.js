import { useEffect } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { getTasks } from "../util/http";
import TaskItem from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { updateTasks } from "../store/redux/tasksReducer";

function TasksList() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const tasks = await getTasks();
        dispatch(updateTasks({ tasks }));
      } catch (error) {
        dispatch(updateTasks({ tasks: [] }));
        Alert.alert("Error", error.message);
      }
    }

    fetchTasks();
  }, []);

  return (
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
              <TaskItem text={itemData.item.title} id={itemData.item.id} />
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tasksContainer: {
    flex: 10,
  },

  noTasks: {
    backgroundColor: "gray",
    padding: 8,
    margin: 8,
    borderRadius: 6,
    color: "white",
  },
});

export default TasksList;
