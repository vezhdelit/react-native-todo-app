import { View, Text, Image, Switch, TouchableOpacity } from "react-native";
import React from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useColorScheme } from "nativewind";
import Ionicons from "@expo/vector-icons/Ionicons";

const Profile = () => {
  const user = FIREBASE_AUTH.currentUser;
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const handleSignOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <View className="flex-1 dark:bg-neutral-900 p-4">
      <TouchableOpacity className=" w-8 ml-auto" onPress={handleSignOut}>
        <Ionicons name="log-out" size={32} color="#f44336" />
      </TouchableOpacity>
      <View className="flex-1 justify-center items-center space-y-8">
        <View className="justify-center items-center space-y-2">
          {user.photoURL && (
            <Image
              className=" w-20 h-20 rounded-full"
              source={{ uri: user.photoURL }}
            />
          )}
          <Text className=" text-lg font-bold dark:text-white">
            Hi, {user.displayName ? user.displayName : "User"}!
          </Text>
        </View>

        <View className=" flex flex-row justify-between ">
          <Text className="text-base dark:text-white">Dark mode</Text>
          <Switch value={colorScheme === "dark"} onChange={toggleColorScheme} />
        </View>
      </View>
    </View>
  );
};

export default Profile;
