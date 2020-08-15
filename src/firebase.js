import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'


// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyDPgJ2HI6Dti0g4u6DnK4BcpenIzgaYmcY",
    authDomain: "curso1-da13c.firebaseapp.com",
    databaseURL: "https://curso1-da13c.firebaseio.com",
    projectId: "curso1-da13c",
    storageBucket: "curso1-da13c.appspot.com",
    messagingSenderId: "1074179801888",
    appId: "1:1074179801888:web:89a9734148187515068d45",
    measurementId: "G-74D3PFRVJR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  let db = firebase.firestore().collection('favs')

  export function updateDB(array, uid){
    return db.doc(uid).set({array})
  }

  export function LoginWithGoogle(){
      let provider = new firebase.auth.GoogleAuthProvider()
      return firebase.auth().signInWithPopup(provider)
      .then(snap => snap.user)
  }

  export function signOutGoogle(){
      firebase.auth().signOut()
  }

   