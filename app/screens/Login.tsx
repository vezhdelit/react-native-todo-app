import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setIsLoading(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async () => {
    setIsLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Success. Check your emails.");
    } catch (error: any) {
      console.log(error);
      alert("Registratio failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-8 pb-20 gap-4 items-center">
      <Text className=" text-center text-2xl font-bold">
        Welcome to the TodoApp
      </Text>
      <TextInput
        className=" bg-white p-4 rounded-lg w-full"
        placeholder="Email.."
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        className=" bg-white p-4 rounded-lg w-full"
        placeholder="Password.."
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View className="w-full">
          <TouchableOpacity
            onPress={signIn}
            className={`${
              !(email && password) ? " bg-gray-500" : " bg-blue-500"
            }  p-4 rounded-lg w-full justify-center items-center`}
            disabled={!(email && password)}
          >
            <Text className="text-white text-base font-medium ">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={signUp}
            className={`p-4 rounded-lg w-full justify-center items-center`}
            disabled={!(email && password)}
          >
            <Text
              className={`${
                !(email && password) ? " text-gray-500" : " text-blue-500"
              } text-base font-medium `}
            >
              Create account
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Login;
