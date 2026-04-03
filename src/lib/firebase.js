import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDHe1_PIRk7lWtxiGdFMOY-_Un3tzK5vM",
  authDomain: "pkplnasihuy.firebaseapp.com",
  projectId: "pkplnasihuy",
  storageBucket: "pkplnasihuy.firebasestorage.app",
  messagingSenderId: "673082442461",
  appId: "1:673082442461:web:83d134842b8f551e1ad134"
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
