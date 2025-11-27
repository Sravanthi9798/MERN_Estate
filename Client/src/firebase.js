// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-4c663.firebaseapp.com",
  projectId: "estate-4c663",
  storageBucket: "estate-4c663.firebasestorage.app",
  messagingSenderId: "178058370212",
  appId: "1:178058370212:web:2b27188fcf5a94411e5a31"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);