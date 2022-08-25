import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
   sendPasswordResetEmail, updateEmail, updatePassword, sendEmailVerification, applyActionCode, reauthenticateWithCredential } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Exports
export const auth = getAuth(app);
export const createUser = createUserWithEmailAndPassword;
export const loginUser = signInWithEmailAndPassword;
export const sendPwResetMail = sendPasswordResetEmail;
export const updateMail = updateEmail;
export const updatePw = updatePassword;
export const addToCollection = addDoc;
export const createCollection = collection;
export const updateDoc = setDoc;
export const document = doc;
export const getDocument = getDoc;
export const getDocuments = getDocs;
export const deleteDocument = deleteDoc;
export const verifyEmail = sendEmailVerification;
export const applyAction = applyActionCode;
export const reauth = reauthenticateWithCredential;
// Database Cloud Firestore
export const db = getFirestore(app);
export default app;
