import { useContext, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TasksContext } from "../store/context/tasks-context";
import { getTasks } from "../util/http";
import TaskItem from "./TaskItem";

function TasksList() {
  const tasksCtx = useContext(TasksContext);

  function deleteTaskHandler(id) {
    tasksCtx.removeTask(id);
  }

  useEffect(() => {
    async function fetchTasks() {
      const tasks = await getTasks();
      tasksCtx.updateTasks(tasks);
    }

    fetchTasks();
  }, []);

  return (
    <View style={styles.tasksContainer}>
      {tasksCtx.tasks.length == 0 && (
        <Text style={styles.noTasks}>No tasks</Text>
      )}
      {tasksCtx.tasks.length > 0 && (
        <FlatList
          data={tasksCtx.tasks}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          renderItem={(itemData) => {
            return (
              <TaskItem
                text={itemData.item.title}
                onDeleteItem={deleteTaskHandler}
                id={itemData.item.id}
              />
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
