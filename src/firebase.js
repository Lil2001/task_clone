import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyCdy_eWe5tm_tJrjlAnxu8gtsiiWxtfMig",
  authDomain: "authentication-react-m.firebaseapp.com",
  databaseURL: "https://authentication-react-m-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "authentication-react-m",
  storageBucket: "authentication-react-m.appspot.com",
  messagingSenderId: "350890697058",
  appId: "1:350890697058:web:e9ad2eb66443722572cc3b",
  measurementId: "G-3HZBWHWP01"
})

export const auth = app.auth()
export default app
