// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdzkGNqpzKzR9i1KxpMkC48R7tb-UoMTw",
  authDomain: "user-email-password-auth-d5d8a.firebaseapp.com",
  projectId: "user-email-password-auth-d5d8a",
  storageBucket: "user-email-password-auth-d5d8a.appspot.com", // ✅ fixed
  messagingSenderId: "552646290917",
  appId: "1:552646290917:web:5d84831d5ef3451097930c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // ✅ use named export
