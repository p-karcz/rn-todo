import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import Task from "../components/Task";
import { DoneProps } from "../data/Navigation";

export default function Done({ route, navigation }: DoneProps) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.tasksWrapper}>
          {route.params.doneTasks.map((item, index) => {
            return (
              <Task key={index} text={item} color={"#93e887"} opacity={0} />
            );
          })}
        </View>
      </ScrollView>
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
});
