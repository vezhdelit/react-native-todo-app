import { View, Text, Image, Switch } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useColorScheme } from "nativewind";
import SignOutButton from "../components/ui/button/SignOutButton";

const Profile = () => {
  const user = FIREBASE_AUTH.currentUser;
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-1 p-4 dark:bg-neutral-900">
      <View className=" items-end">
        <SignOutButton />
      </View>
      <View className="flex-1 items-center justify-center space-y-8">
        <View className="items-center justify-center space-y-2">
          {user.photoURL && (
            <Image
              className=" h-20 w-20 rounded-full"
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
