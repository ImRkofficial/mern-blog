// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-bc0cf.firebaseapp.com",
  projectId: "mern-blog-bc0cf",
  storageBucket: "mern-blog-bc0cf.appspot.com",
  messagingSenderId: "959201846884",
  appId: "1:959201846884:web:1e05841ae15d308c862171"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);