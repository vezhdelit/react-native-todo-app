import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "react-native";
import Home from "../screens/Home";
import Login from "../screens/Login";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import SignUp from "../screens/SignUp";

const Stack = createNativeStackNavigator();
const SignedInStack = createNativeStackNavigator();
const SignedOutStack = createNativeStackNavigator();

const SignedInLayout = () => {
  return (
    <SignedInStack.Navigator>
      <SignedInStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </SignedInStack.Navigator>
  );
};

const SignedOutLayout = () => {
  return (
    <SignedOutStack.Navigator>
      <SignedOutStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <SignedOutStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </SignedOutStack.Navigator>
  );
};

const Navigation = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="SignedInLayout"
            component={SignedInLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="SignedOutLayout"
            component={SignedOutLayout}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
