import firebase from 'firebase/app'

// Add additional services that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
require("firebase/functions");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyANRw76KlE6FlK1JU0AIUfTs3qvJkOzpvg",
    authDomain: "vue-firebase-2c9bf.firebaseapp.com",
    databaseURL: "https://vue-firebase-2c9bf.firebaseio.com",
    projectId: "vue-firebase-2c9bf",
    storageBucket: "vue-firebase-2c9bf.appspot.com",
    messagingSenderId: "786952429480"
};

firebase.initializeApp(config);
// firebase.firestore().settings({
//     timestampsInSnapshots: true
// })
  
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const functions = firebase.functions()
  
export {
    firebase,
    auth,
    db,
    storage,
    functions
}