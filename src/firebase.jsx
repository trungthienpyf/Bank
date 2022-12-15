import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAsOjSG0P2Uk7BpyMMDs3yewjE-zPhedEw",
  authDomain: "fir-otp-701da.firebaseapp.com",
  projectId: "fir-otp-701da",
  storageBucket: "fir-otp-701da.appspot.com",
  messagingSenderId: "208802329885",
  appId: "1:208802329885:web:3030133cb425e4179a5df4",
  measurementId: "G-4HPSWR7PLT",
};
const app = initializeApp(firebaseConfig);

export const authentication = getAuth();
