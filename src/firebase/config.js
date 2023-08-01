// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//Authentication Object
import { getAuth } from "firebase/auth"

//to use storage, we need to have "storage object"
import { getStorage } from "firebase/storage"

//to use Cloud Firestore (Firestore Database)
import { getFirestore } from "firebase/firestore" 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    //config file from firebase...
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
