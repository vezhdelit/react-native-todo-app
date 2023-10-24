import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import GoogleSignIn from "../components/ui/button/GoogleSignInButton";
import Ionicons from "@expo/vector-icons/Ionicons";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  const signUp = async () => {
    setIsLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log(response);
      alert("Success. Your account is created!");
    } catch (error: any) {
      console.log(error);
      alert("Registratio failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="flex-1 justify-center p-8 pb-20 gap-4 items-center dark:bg-neutral-900">
      <Text className=" text-center text-2xl font-bold dark:text-white">
        Create your account!
      </Text>
      <View className="w-full">
        <GoogleSignIn FIREBASE_AUTH={FIREBASE_AUTH} />
      </View>
      <Text className=" text-base text-gray-500"> or</Text>
      <TextInput
        className=" bg-white p-4 rounded-lg w-full dark:bg-neutral-800 dark:text-white"
        placeholderTextColor={"gray"}
        placeholder="Email.."
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View className=" flex flex-row bg-white p-4 rounded-lg w-full justify-between items-center dark:bg-neutral-800">
        <TextInput
          className="dark:text-white"
          placeholderTextColor={"gray"}
          placeholder="Password.."
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={isPasswordHidden}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordHidden(!isPasswordHidden)}
        >
          <Ionicons
            name={isPasswordHidden ? "ios-eye-off" : "ios-eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View className="w-full">
          <TouchableOpacity
            onPress={signUp}
            className={`${
              !(email && password) ? " bg-gray-500" : " bg-blue-500"
            }  p-4 rounded-lg w-full justify-center items-center`}
            disabled={!(email && password)}
          >
            <Text className="text-white text-base font-medium ">
              Create account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            className={`p-4 rounded-lg w-full justify-center items-center`}
          >
            <Text className="text-blue-500 text-base">
              Already have an account? Login!
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SignUp;
