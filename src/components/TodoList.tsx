import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const todoRef = query(
        collection(FIRESTORE_DB, "todos"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc") // Sort by timestamp in ascending order
      );

      const subscriber = onSnapshot(todoRef, {
        next: (snapshot) => {
          const todos: any[] = [];
          snapshot.docs.forEach((doc) => {
            todos.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setTodos(todos);
          setIsLoading(false);
        },
      });

      return () => subscriber();
    } else {
      alert("Error. Can't authenticate user");
    }
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View className="mt-4">
            <TodoItem item={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  gap: {
    gap: 16,
  },
});
