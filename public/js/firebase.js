import { initializeApp } from "/firebase/app";
import { getFirestore } from "/firebase/firestore";

import "../index.css";
import "../background.css";

const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }

