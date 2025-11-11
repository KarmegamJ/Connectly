// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVqQyVBGV1h8wP-P3z_BLWG-qRlb8GmFo",
  authDomain: "connectly-chat.firebaseapp.com",
  projectId: "connectly-chat",
  storageBucket: "connectly-chat.firebasestorage.app",
  messagingSenderId: "526914976183",
  appId: "1:526914976183:web:a01efd86ad0b3727f69032",
  measurementId: "G-FG24P4JG94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
