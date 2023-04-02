import "./App.css";
import { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { db, auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Dashboard from "./Components/User/Dashboard/Dashboard";

export const AuthContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getUserInfo(uid) {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const user = docSnap.data();
        user["uid"] = uid;
        setCurrentUser(user);
      } else {
        console.log("No such document!");
      }
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserInfo(user.uid);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  // useEffect(() => {

  //   async function getUserInfo() {
  //     const userRef = doc(db, "users", currentUser.uid);
  //     const docSnap = await getDoc(userRef);

  //     if (docSnap.exists()) {
  //       const user = docSnap.data();
  //       user["uid"] = currentUser.uid
  //       setCurrentUser(user)
  //     } else {
  //       console.log("No such document!");
  //     }

  //   }

  //   if (currentUser) {
  //     getUserInfo()
  //   }
  // }, [])

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
