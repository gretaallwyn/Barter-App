import firebase from 'firebase';
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyBisrjP7b7nwDDMSkdcQiC70knWQPkMwwU",
    authDomain: "barter-app-af468.firebaseapp.com",
    projectId: "barter-app-af468",
    storageBucket: "barter-app-af468.appspot.com",
    messagingSenderId: "952315377189",
    appId: "1:952315377189:web:b8dace9f82a8366c56f1cc"
  };

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();