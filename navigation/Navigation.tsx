import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "react-native";
import Home from "../app/screens/Home";
import Login from "../app/screens/Login";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";

const SignedInStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const SignedInLayout = () => {
  return (
    <SignedInStack.Navigator>
      <SignedInStack.Screen
        name="My Todos"
        component={Home}
        options={{ headerShown: false }}
      />
    </SignedInStack.Navigator>
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
            name="SignedIn"
            component={SignedInLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
