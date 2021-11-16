import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

interface Props {
  text: string;
  color: string;
  opacity: number;
  done?: () => void;
  delete?: () => void;
}

const Task = (props: Props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity
          style={[styles.square, { backgroundColor: props.color }]}
          onPress={props.done}
        />
        <Text>{props.text}</Text>
      </View>
      <TouchableOpacity onPress={props.delete}>
        <Image
          style={[styles.taskBin, { opacity: props.opacity }]}
          source={require("../assets/bin.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  taskBin: {
    width: 36,
    height: 36,
    tintColor: "#55bcf6",
  },
});

export default Task;
