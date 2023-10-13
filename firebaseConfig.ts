import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAO0jl-ViW0Sr1-ErhuVaxvEJcWrHZt7_k",
  authDomain: "react-native-todolist-b8679.firebaseapp.com",
  projectId: "react-native-todolist-b8679",
  storageBucket: "react-native-todolist-b8679.appspot.com",
  messagingSenderId: "301594759884",
  appId: "1:301594759884:web:da91d632272d0a0492a869",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
