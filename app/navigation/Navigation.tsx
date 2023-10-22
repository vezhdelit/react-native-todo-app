import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "nativewind";

import { StatusBar } from "react-native";
import Home from "../screens/Home";
import Login from "../screens/Login";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import SignUp from "../screens/SignUp";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SignedInLayout = () => {
  const { colorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderColor: "transparent",
          elevation: 0,
          borderWidth: 0,
          height: 70,
          backgroundColor: `${colorScheme == "dark" ? "#262626" : "white"}`,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"} // Change icon name accordingly
              size={24}
              color={focused ? "#2196f3" : "gray"} // Change icon color accordingly
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"} // Change icon name accordingly
              size={24}
              color={focused ? "#2196f3" : "gray"} // Change icon color accordingly
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const SignedOutLayout = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

//root navigation function
const Navigation = () => {
  const [user, setUser] = useState<User | null>(null);
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={`${colorScheme == "dark" ? "#171717" : "white"}`}
        barStyle={`${colorScheme == "dark" ? "light-content" : "dark-content"}`}
      />
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
