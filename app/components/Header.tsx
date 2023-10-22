import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const handleSignOut = async () => {
  try {
    await FIREBASE_AUTH.signOut();
  } catch (error) {
    alert(error);
    console.log(error);
  }
};
const Header = () => {
  const user = FIREBASE_AUTH.currentUser;
  return (
    <View className="flex flex-row bg-white px-6 py-2 justify-between items-center">
      <View className=" flex flex-row items-center space-x-1">
        {user.photoURL && (
          <Image
            className="w-6 h-6 rounded-full"
            source={{
              uri: user.photoURL,
            }}
          />
        )}

        <Text className=" text-lg font-bold text-center">
          Hi {user.displayName ? user.displayName : "User"}
        </Text>
      </View>

      <TouchableOpacity className=" w-8" onPress={handleSignOut}>
        <Ionicons name="log-out" size={32} color="#f44336" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
