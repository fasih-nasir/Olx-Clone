import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, query, where, onSnapshot, collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBht9stiDDzqkjO1MEb94j5ahu7uQ7V5rk",
  authDomain: "xyzrfgd1.firebaseapp.com",
  projectId: "xyzrfgd1",
  storageBucket: "xyzrfgd1.appspot.com",
  messagingSenderId: "290778823624",
  appId: "1:290778823624:web:cd3810bac0eecad9429efd",
  measurementId: "G-NY23GJ1CLQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  where, query, getStorage, uploadBytes, app, db, auth, storage, onSnapshot,
  doc, signOut, onAuthStateChanged, getDownloadURL, signInWithEmailAndPassword,
  ref, uploadBytesResumable, createUserWithEmailAndPassword, updateDoc,
  collection, addDoc
};
