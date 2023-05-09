
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDQT3s08-uWuMlpftOXQ8DUR7tC4P-G3Pw",
  authDomain: "chatapp-e3af7.firebaseapp.com",
  projectId: "chatapp-e3af7",
  storageBucket: "chatapp-e3af7.appspot.com",
  messagingSenderId: "1091147389353",
  appId: "1:1091147389353:web:ca9e964eec15bee7948cb8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */

export default firebaseApp;