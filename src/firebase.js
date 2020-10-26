import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAAdHuVMQBEcR2LA7wVYyHxyK3kyJq4MVo",
    authDomain: "nasa-a85ab.firebaseapp.com",
    databaseURL: "https://nasa-a85ab.firebaseio.com",
    projectId: "nasa-a85ab",
    storageBucket: "nasa-a85ab.appspot.com",
    messagingSenderId: "923548521171",
    appId: "1:923548521171:web:4fd7e119aced25b658fa26"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()

export {
    db,
    auth
  }