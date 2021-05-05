import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAbR2Wz8hFUP_XY3rVeumYWF_gqENS2g1I",
  authDomain: "todo-14412.firebaseapp.com",
  projectId: "todo-14412",
  storageBucket: "todo-14412.appspot.com",
  messagingSenderId: "887862161411",
  appId: "1:887862161411:web:1fdf0a31814da3706c1e36"

}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db;