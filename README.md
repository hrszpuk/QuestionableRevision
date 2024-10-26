# QuestionableRevision


# Firebase SDK

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKYVLgjQGiIi1hNAhfMBH5ht7diUIFxbU",
  authDomain: "questionablerevision.firebaseapp.com",
  projectId: "questionablerevision",
  storageBucket: "questionablerevision.appspot.com",
  messagingSenderId: "502105386254",
  appId: "1:502105386254:web:f0fa77c4fe251ec0843b5f",
  measurementId: "G-1FR2LR3XB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
