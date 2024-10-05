// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7yK-JudjnR2d5j-OuKhsqSDWzQibJ-g8",
    authDomain: "lamourgames-2024.firebaseapp.com",
    projectId: "lamourgames-2024",
    storageBucket: "lamourgames-2024.appspot.com",
    messagingSenderId: "888011239443",
    appId: "1:888011239443:web:278bc85090986b3960cfe6",
    measurementId: "G-DEVBP7E6M3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
