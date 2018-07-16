import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(process.env.firebaseConfig);
}

export default firebase;
