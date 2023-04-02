// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDoc,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "community-drive.firebaseapp.com",
  projectId: "community-drive",
  storageBucket: "community-drive.appspot.com",
  messagingSenderId: "640760788763",
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// async function getCompanyTasks() {
//   const docRef = doc(db, "tasks", "bOZuLrkp8LepJxTGDmjk");
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
// }

async function setTheNft(transactionId, userId, rare) {
  await setDoc(doc(db, "nfts", `${transactionId}`), {
    uid: userId,
    rarity: rare,
  });
}

// getCompanyTasks();

// export default app;
export { auth, db, setTheNft };
