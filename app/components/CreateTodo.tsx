import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";

const CreateTodo = () => {
  const [todo, setTodo] = useState("");

  const addTodo = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const timestamp = new Date().toISOString(); // Create a timestamp

      const doc = await addDoc(collection(FIRESTORE_DB, "todos"), {
        title: todo,
        done: false,
        userId: user.uid, // Associate the to-do with the user
        createdAt: timestamp, // Include the timestamp in the todo document
      });
      setTodo("");
    } else {
      alert("Error. Can't authenticate user");
    }
  };

  return (
    <View
      // style={styles.form}
      className="flex flex-row gap-4"
    >
      <TextInput
        className=" flex-1 p-4 rounded-lg bg-white text-base"
        // style={styles.input}
        placeholder="Add new todo"
        value={todo}
        onChangeText={(text: string) => setTodo(text)}
      />
      <TouchableOpacity
        className={`${
          todo === "" ? " bg-gray-500" : " bg-blue-500"
        }  p-4 rounded-lg justify-center items-center`}
        onPress={() => addTodo()}
        disabled={todo === ""}
      >
        <Text className="text-white text-base font-medium ">Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateTodo;
