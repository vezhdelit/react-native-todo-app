import { View, Text, SafeAreaView } from "react-native";
import CreateTodo from "../components/CreateTodo";
import TodoList from "../components/TodoList";

//TODO: Define proper types
const Home = () => {
  return (
    <SafeAreaView className="flex-1 p-4 dark:bg-neutral-900 ">
      <CreateTodo />
      <TodoList />
    </SafeAreaView>
  );
};

export default Home;
