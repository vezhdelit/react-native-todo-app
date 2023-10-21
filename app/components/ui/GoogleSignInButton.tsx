import { View, Text, TouchableOpacity } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Auth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import Ionicons from "@expo/vector-icons/Ionicons";

interface GoogleSignInProps {
  FIREBASE_AUTH: Auth;
}

const GoogleSignIn = ({ FIREBASE_AUTH }: GoogleSignInProps) => {
  GoogleSignin.configure({
    webClientId:
      "301594759884-rqfihvmjk8jho5tigiublekk6i4g932b.apps.googleusercontent.com",
  });

  const signInWithGoogle = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      const response = signInWithCredential(FIREBASE_AUTH, googleCredential);
      console.log(response);
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={signInWithGoogle}
        className="flex flex-row bg-red-600 p-4 rounded-lg w-full justify-center items-center space-x-2"
      >
        <Ionicons name="logo-google" size={24} color="white" />

        <Text className="text-white text-base font-medium ">
          Sign in with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignIn;
