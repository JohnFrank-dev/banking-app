import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyD2foIUHibXUM5_2zJirxTvKDlYMEhewJg",
  authDomain: "full-stack-banking-app.firebaseapp.com",
  projectId: "full-stack-banking-app",
  storageBucket: "full-stack-banking-app.appspot.com",
  messagingSenderId: "949643862693",
  appId: "1:949643862693:web:05e13324a487786048634c",
});

const auth = firebase.auth();
const db = firebase.firestore();
const FieldValue = firebase.firestore.FieldValue;

export { auth, db, FieldValue };
