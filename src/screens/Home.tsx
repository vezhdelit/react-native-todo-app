import { View, Text, SafeAreaView } from "react-native";
import CreateTodo from "../components/CreateTodo";
import TodoList from "../components/TodoList";

//TODO: Define proper types
const Home = () => {
  return (
    <SafeAreaView className="dark:bg-neutral-900 flex-1 p-4 ">
      <CreateTodo />
      <TodoList />
    </SafeAreaView>
  );
};

export default Home;
