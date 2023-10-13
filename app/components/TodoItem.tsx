import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

const TodoItem = ({ item }: any) => {
  const ref = doc(FIRESTORE_DB, `todos/${item.id}`);

  const toggleDone = async () => {
    updateDoc(ref, { done: !item.done });
  };

  const deleteItem = async () => {
    deleteDoc(ref);
  };

  return (
    <View className="flex flex-row  justify-between items-center p-4 rounded-lg bg-white">
      <TouchableOpacity
        className="flex flex-row w-64 items-center gap-2"
        onPress={toggleDone}
      >
        {item.done ? (
          <Ionicons name="md-checkmark-circle" size={32} color="#2196f3" />
        ) : (
          <Ionicons name="radio-button-off" size={32} color="#2196f3" />
        )}

        <Text className=" text-base text-justify">{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity className=" w-8" onPress={deleteItem}>
        <Ionicons name="trash" size={32} color="#f44336" />
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;
