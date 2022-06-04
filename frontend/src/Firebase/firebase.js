// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqzuahUIkkUBZDKGeLkoaY3WoSMpyDexM",
  authDomain: "animalhub-10a0e.firebaseapp.com",
  projectId: "animalhub-10a0e",
  storageBucket: "animalhub-10a0e.appspot.com",
  messagingSenderId: "687781488034",
  appId: "1:687781488034:web:40154d81381e4c58a17efb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

// firebase.initializeApp(firebaseConfig);
// var auth = firebase.auth();
// export {auth , firebase};