// firebase/utils.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup as firebaseSignInWithPopup,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseConfig } from "./config";

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

// Configure Google Auth provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Export functions
export const sendPasswordResetEmail = (email, config) =>
  firebaseSendPasswordResetEmail(auth, email, config);

export const CreateUserWithEmailAndPassword = (email, password) =>
  firebaseCreateUserWithEmailAndPassword(auth, email, password);

export const signInWithEmailAndPassword = (email, password) =>
  firebaseSignInWithEmailAndPassword(auth, email, password);

export const signInWithGooglePopup = () =>
  firebaseSignInWithPopup(auth, googleProvider);

export { auth, firestore };

export const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return null;

  const { uid } = userAuth;
  const userRef = doc(firestore, `users/${uid}`);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    const userRoles = ['user'];

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdDate: timestamp,
        userRoles,
        ...additionalData,
      });
    } catch (err) {
      console.error("Error creating user profile", err);
    }
  }
  return userRef;
};

export const getCurrentUser = () =>{
  return new Promise((resolve, reject) =>{
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}
