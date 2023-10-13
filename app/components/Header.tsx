import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FIREBASE_AUTH } from "../../firebaseConfig";

const Header = () => {
  return (
    <View className="flex flex-row bg-white px-6 py-2 justify-between items-center">
      <Text className=" text-lg font-bold text-center">My Todos</Text>
      <TouchableOpacity
        className=" w-8"
        onPress={() => FIREBASE_AUTH.signOut()}
      >
        <Ionicons name="log-out" size={32} color="#f44336" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
