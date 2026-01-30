import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgHGddlwQySX6I7nWYjOrvtM8PTVvymCM",
  authDomain: "micro-innovation-advisor.firebaseapp.com",
  projectId: "micro-innovation-advisor",
  storageBucket: "micro-innovation-advisor.firebasestorage.app",
  messagingSenderId: "709287076983",
  appId: "1:709287076983:web:3c190f5b69a14d8ca81272"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
