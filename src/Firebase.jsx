import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  getAuth,
  signOut
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase, ref as dbRef, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCORaJCN8cXUwwiuIsIpEcQnSVfqE8Kg5M",
  authDomain: "r-gfg-86633.firebaseapp.com",
  databaseURL: "https://r-gfg-86633-default-rtdb.firebaseio.com",
  projectId: "r-gfg-86633",
  storageBucket: "r-gfg-86633.appspot.com",
  messagingSenderId: "1091682881949",
  appId: "1:1091682881949:web:88d7409563cf42f2ccdf74"
};

// Initialize Firebase App and Auth
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create the Firebase Context
const FirebaseContext = createContext(null);

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
}

export function FirebaseProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else setUser(null);
    });
  }, []);

  const isLogin = !!user;

  const firestore = getFirestore(app);
  const storage = getStorage(app);
  const database = getDatabase(app);

  function signUpUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signInUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signInUserGoogle() {
    const googlePro = new GoogleAuthProvider();
    return signInWithPopup(auth, googlePro);
  }

  function signInUserGithub() {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
  }

  function signOutUser() {
    return signOut(auth);
  }

  async function addTeam(uid, data) {
    const docRef = doc(firestore, "Teams", uid);
    return setDoc(docRef, data);
  }

  async function getTeamByUID(uid) {
    const docRef = doc(firestore, "Teams", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such team exists!");
    }
  }

  async function updateQuestionStatus(id, isActive) {
    try {
      const questionRef = dbRef(database, `Question4/${id}`);
      await update(questionRef, { isActive });
      return "Update successful!";
    } catch (error) {
      console.error("Error updating question:", error);
      throw new Error("Failed to update question");
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        user,
        signUpUser,
        signInUser,
        signInUserGoogle,
        signInUserGithub,
        signOutUser,
        isLogin,
        firestore,
        storage,
        database,
        addTeam,
        getTeamByUID,
        updateQuestionStatus
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
