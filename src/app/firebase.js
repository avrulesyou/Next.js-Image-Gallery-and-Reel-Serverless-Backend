import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
};

const functions = require('firebase-functions');
const express = require('express');
const appp = express();

// Allow origins to access the resources
app.use((req, res, next) => {
  res.header('-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Your other routes and middleware

exports.app = functions.https.onRequest(appp)

const app = initializeApp(firebaseConfig);
console.log(app);
console.log("Firebase initialized");
const firestore = getFirestore(app);
console.log(firestore);
console.log("Firestore initialized");
const storage = getStorage(app);
console.log(storage);
console.log("Storage initialized");
//firebase.initializeApp(firebaseConfig);


export { firestore, storage }; 