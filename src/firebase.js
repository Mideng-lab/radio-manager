import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBsA2-Ov8V2I0NWEwTXz99u74rZ2WuTEbA",
    authDomain: "radio-manager-b84f7.firebaseapp.com",
    projectId: "radio-manager-b84f7",
    storageBucket: "radio-manager-b84f7.firebasestorage.app",
    messagingSenderId: "509311650534",
    appId: "1:509311650534:web:7956ea0872c40424958927",
    measurementId: "G-Q1LD37F00P"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, setDoc, onSnapshot };
