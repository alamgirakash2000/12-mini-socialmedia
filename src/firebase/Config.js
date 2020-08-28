import firebase from "firebase";

const Config = firebase.initializeApp({
  apiKey: "AIzaSyARGPOF5R2KxcqAz5jpqeQGsgMIo864g8U",
  authDomain: "instagram-clone-3b4bd.firebaseapp.com",
  databaseURL: "https://instagram-clone-3b4bd.firebaseio.com",
  projectId: "instagram-clone-3b4bd",
  storageBucket: "instagram-clone-3b4bd.appspot.com",
  messagingSenderId: "638527001348",
  appId: "1:638527001348:web:e6af84ba473505b6753651",
  measurementId: "G-PX7Y6Y2DXZ",
});

const database = Config.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { database, auth, storage };
