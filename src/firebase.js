// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore,collection } from "firebase/firestore"
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcxJ6cY-dcTwYM9Pi4Df6chpLRSYsX3MU",
  authDomain: "musicappplayer-74461.firebaseapp.com",
  projectId: "musicappplayer-74461",
  storageBucket: "musicappplayer-74461.appspot.com",
  messagingSenderId: "732980731247",
  appId: "1:732980731247:web:ea5f797104459b17fe9c9a",
  measurementId: "G-RT2NJVLBZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db =  getFirestore(app)
export const usersCollection = collection(db, "users")
export const auth = getAuth(app);
export const storage = getStorage(app);