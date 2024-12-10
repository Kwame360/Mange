// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1D7imJNTcjntFYj-9eFDF9KJnOjOjmRc",
  authDomain: "mange-73740.firebaseapp.com",
  projectId: "mange-73740",
  storageBucket: "mange-73740.firebasestorage.app",
  messagingSenderId: "1030380909215",
  appId: "1:1030380909215:web:9058dd7304c1d5813aa8aa",
  measurementId: "G-CT5RECXET4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};