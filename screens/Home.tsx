import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Task from "../components/Task";
import { HomeProps } from "../data/Navigation";

export default function Home({ route, navigation }: HomeProps) {
  const [task, setTask] = useState<string>();
  const [tasks, setTasks] = useState<Array<string>>([]);
  const [doneTasks, setDoneTasks] = useState<Array<string>>([]);

  useEffect(() => {
    getTasksFromStorage();
  }, []);

  const saveTasksToStorage = async (
    key: string,
    tasksToBeSaved: Array<string>
  ) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(tasksToBeSaved));
    } catch (e) {
      console.log("Could not save tasks to storage.");
    }
  };

  const getTasksFromStorage = async () => {
    try {
      const newTasks = await AsyncStorage.getItem("tasks");
      const newDoneTasks = await AsyncStorage.getItem("doneTasks");

      if (newTasks !== null) {
        setTasks(JSON.parse(newTasks));
      }

      if (newDoneTasks !== null) {
        setDoneTasks(JSON.parse(newDoneTasks));
      }
    } catch (e) {
      console.log("Could not load tasks from storage.");
    }
  };

  const handleDeleteTask = (index: number) => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    saveTasksToStorage("tasks", newTasks);
  };

  const handleAddTask = () => {
    if (typeof task != "undefined") {
      Keyboard.dismiss();
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      setTask(undefined);
      saveTasksToStorage("tasks", newTasks);
    }
  };

  const handleCompleteTask = (index: number) => {
    let newTasks = [...tasks];
    const deletedTask = newTasks.splice(index, 1)[0];
    const newDoneTasks = [...doneTasks, deletedTask];
    setDoneTasks(newDoneTasks);
    setTasks(newTasks);
    saveTasksToStorage("tasks", newTasks);
    saveTasksToStorage("doneTasks", newDoneTasks);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'>
        <View style={styles.tasksWrapper}>
          {tasks.map((item, index) => {
            return (
              <Task
                key={index}
                text={item}
                color={"#55bcf6"}
                opacity={0.7}
                done={() => handleCompleteTask(index)}
                delete={() => handleDeleteTask(index)}
              />
            );
          })}
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.addWrapper} onPress={handleAddTask}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addWrapper}
          onPress={() => navigation.navigate("Done", { doneTasks: doneTasks })}>
          <Text>{"->"}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    padding: 20,
  },
  writeTaskWrapper: {
    bottom: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
});
