// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: "community-drive.firebaseapp.com",
    projectId: "community-drive",
    storageBucket: "community-drive.appspot.com",
    messagingSenderId: "640760788763",
    appId: process.env.REACT_APP_FIREBASE_APPID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



// export default app;
export { auth, db };
