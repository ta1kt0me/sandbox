import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

if (!firebase.apps.length) {
  firebase.initializeApp(process.env.firebaseConfig);
}

export default firebase;
