// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage ,ref} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo46ZWTs3C9xbXosh9eGCP3mzQcwtv-kU",
  authDomain: "eventplazaweb.firebaseapp.com",
  projectId: "eventplazaweb",
  storageBucket: "eventplazaweb.appspot.com",
  messagingSenderId: "963216240153",
  appId: "1:963216240153:web:db521a693fa50d3ad04488"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export default storage