import { View, Text, SafeAreaView } from "react-native";
import CreateTodo from "../components/CreateTodo";
import TodoList from "../components/TodoList";
import Header from "../components/Header";

//TODO: Define proper types
const Home = () => {
  return (
    <>
      <Header />
      <SafeAreaView className=" flex-1 p-4 ">
        <CreateTodo />
        <TodoList />
      </SafeAreaView>
    </>
  );
};

export default Home;
