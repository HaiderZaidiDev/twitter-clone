// Firebase SDK.
import firebase from "firebase/app";

// Firebase Services
import "firebase/auth";
import "firebase/firestore";

// Firebase Configuration
var firebaseConfig = {
    apiKey: "AIzaSyAD5I48dlfUdQEXJQRUAOOENyg3_kfKzXA",
    authDomain: "twitter-clone-2dc76.firebaseapp.com",
    projectId: "twitter-clone-2dc76",
    storageBucket: "twitter-clone-2dc76.appspot.com",
    messagingSenderId: "789249732966",
    appId: "1:789249732966:web:5091028c3fbf8b63ab18a7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase;
