// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0HMCOc6Og28dnsfOqwuF_Ia1dTTYAj24",
  authDomain: "reastapi.firebaseapp.com",
  projectId: "reastapi",
  storageBucket: "reastapi.appspot.com",
  messagingSenderId: "577265070444",
  appId: "1:577265070444:web:f9db53c965ff0e39c94349",
  measurementId: "G-MH77MCH84F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);