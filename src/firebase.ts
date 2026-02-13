// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP6PvYfS5a1Cy4eXnj5abv1fflVf5aT_A",
  authDomain: "household-ts-e1a6c.firebaseapp.com",
  projectId: "household-ts-e1a6c",
  storageBucket: "household-ts-e1a6c.firebasestorage.app",
  messagingSenderId: "417823621462",
  appId: "1:417823621462:web:ec487fe4d25c56ef1616f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};