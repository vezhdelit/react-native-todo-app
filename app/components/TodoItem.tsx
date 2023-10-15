import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useState, useRef, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

const TodoItem = ({ item }: any) => {
  const ref = doc(FIRESTORE_DB, `todos/${item.id}`);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.title);
  const textInputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    if (isEditing && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [isEditing]);

  const editTodo = async () => {
    if (isEditing) {
      // Save edited text to Firebase
      updateDoc(ref, { title: editedText });
    }

    setIsEditing(!isEditing);
  };

  const toggleDone = async () => {
    updateDoc(ref, { done: !item.done });
  };

  const deleteItem = async () => {
    deleteDoc(ref);
  };

  return (
    <View className="flex flex-row  justify-between items-center p-4 rounded-lg bg-white">
      <TouchableOpacity
        className="flex flex-row w-60 items-center gap-2"
        onPress={toggleDone}
      >
        {item.done ? (
          <Ionicons name="md-checkmark-circle" size={32} color="#2196f3" />
        ) : (
          <Ionicons name="radio-button-off" size={32} color="#2196f3" />
        )}

        {isEditing ? (
          <TextInput
            ref={textInputRef} // Reference to the TextInput component
            className="text-base text-justify underline w-full"
            value={editedText}
            onChangeText={(text) => setEditedText(text)}
            multiline={true}
          />
        ) : (
          <Text className="text-base text-justify">{item.title}</Text>
        )}
      </TouchableOpacity>
      <View className="flex flex-row items-center">
        <TouchableOpacity
          className="w-8"
          onPress={isEditing ? editTodo : editTodo}
        >
          {isEditing ? (
            <Ionicons name="checkmark" size={32} color="#4CAF50" />
          ) : (
            <Ionicons name="create" size={32} color="#607D8B" />
          )}
        </TouchableOpacity>

        <TouchableOpacity className=" w-8" onPress={deleteItem}>
          <Ionicons name="trash" size={32} color="#f44336" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoItem;
