import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDbqTjsHHs6RbtQ9lGqVmPopAVpIOWW884",
    authDomain: "student-facility.firebaseapp.com",
    projectId: "student-facility",
    storageBucket: "student-facility.appspot.com",
    messagingSenderId: "211556669077",
    appId: "1:211556669077:web:9d342a6a695fe117706d9c"
  };

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage();
const auth = getAuth();
export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
