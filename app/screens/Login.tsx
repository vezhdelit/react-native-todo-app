import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import GoogleSignIn from "../components/ui/GoogleSignInButton";
import Ionicons from "@expo/vector-icons/Ionicons";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<Boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<Boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  useEffect(() => {
    setIsLoadingAuth(true);
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setIsLoadingAuth(false);
    });
  }, []);

  const signIn = async () => {
    setIsLoadingSubmit(true);
    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log(response);
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  if (isLoadingAuth) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View className="flex-1 justify-center p-8 pb-20 space-y-4 items-center">
      <Text className=" text-center text-2xl font-bold">
        Welcome to the TodoApp
      </Text>
      <View className="w-full">
        <GoogleSignIn FIREBASE_AUTH={FIREBASE_AUTH} />
      </View>
      <Text className=" text-base text-gray-600"> or</Text>
      <View className="w-full space-y-4">
        <TextInput
          className=" bg-white p-4 rounded-lg w-full"
          placeholder="Email.."
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <View className=" flex flex-row bg-white p-4 rounded-lg w-full justify-between items-center">
          <TextInput
            className=""
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

        {isLoadingSubmit ? (
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
              onPress={() => navigation.navigate("SignUp")}
              className={`p-4 rounded-lg w-full justify-center items-center`}
            >
              <Text className="text-blue-500 text-base">
                Don't have an account? Create one!
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Login;
