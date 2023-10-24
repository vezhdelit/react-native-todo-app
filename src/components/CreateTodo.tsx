import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import CustomButton from "./ui/button/CustomButton";
import CustomInput from "./ui/input/CustomInput";

const CreateTodo = () => {
  const [todo, setTodo] = useState("");

  const addTodo = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const timestamp = new Date().toISOString(); // Create a timestamp
      const newDoc = todo;
      setTodo("");

      const doc = await addDoc(collection(FIRESTORE_DB, "todos"), {
        title: newDoc,
        done: false,
        userId: user.uid, // Associate the to-do with the user
        createdAt: timestamp, // Include the timestamp in the todo document
      });
    } else {
      alert("Error. Can't authenticate user");
    }
  };

  return (
    <View className="flex flex-row items-center space-x-4">
      <CustomInput
        value={todo}
        onChangeText={(text) => setTodo(text)}
        containerClassname=" flex-1"
        placeholderText="Add new todo"
      />
      <View>
        <CustomButton
          containerClassname="p-[18px]"
          title="Add Todo"
          isDisabled={todo === ""}
          onPress={() => addTodo()}
        />
      </View>
    </View>
  );
};

export default CreateTodo;
