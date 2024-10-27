import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import "../index.css";
import "../background.css";

const firebaseConfig = {
    apiKey: "AIzaSyDKYVLgjQGiIi1hNAhfMBH5ht7diUIFxbU",
    projectId: "questionablerevisio",
    storageBucket: "gs://questionablerevision.appspot.com",
    messagingSenderId: "502105386254 ",
    appId: "1:502105386254:web:f0fa77c4fe251ec0843b5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


