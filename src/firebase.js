import firebase from "firebase";
//npm install firebase

const firebaseConfig = {
  apiKey: "AIzaSyCk-F0Jet4EWXi3h-fTBpKCPL1Hxhk7rDw",
  authDomain: "elcotorreo-6ea57.firebaseapp.com",
  projectId: "elcotorreo-6ea57",
  storageBucket: "elcotorreo-6ea57.appspot.com",
  messagingSenderId: "98557364282",
  appId: "1:98557364282:web:3127819610793b0db80d03",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export default firebase;
