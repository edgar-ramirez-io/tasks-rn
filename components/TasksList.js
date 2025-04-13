import { useContext, useEffect } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { TasksContext } from "../store/context/tasks-context";
import { getTasks } from "../util/http";
import TaskItem from "./TaskItem";

function TasksList() {
  const tasksCtx = useContext(TasksContext);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const tasks = await getTasks();
        tasksCtx.updateTasks(tasks);
      } catch (error) {
        tasksCtx.updateTasks(undefined);
        Alert.alert("Error", error.message);
      }
    }

    fetchTasks();
  }, []);

  return (
    <View style={styles.tasksContainer}>
      {(tasksCtx.tasks === undefined || tasksCtx.tasks.length == 0) && (
        <Text style={styles.noTasks}>No tasks</Text>
      )}
      {tasksCtx.tasks !== undefined && tasksCtx.tasks.length > 0 && (
        <FlatList
          data={tasksCtx.tasks}
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
