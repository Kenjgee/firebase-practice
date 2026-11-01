// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOCJbACteCqPK_wuKeX7p1sYaldSqiYoo",
  authDomain: "fir-practice-19d24.firebaseapp.com",
  projectId: "fir-practice-19d24",
  storageBucket: "fir-practice-19d24.firebasestorage.app",
  messagingSenderId: "343712827022",
  appId: "1:343712827022:web:36b84fb81bdb9f8dbb2bdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);