import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';




const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };

  //variable de entorno verlas
 // console.log(process.env);

/*
const firebaseConfigTesting = {
    apiKey: "AIzaSyBCsdKUJ-5CMGU3XMQDUzeRSqDjV_9hR30",
    authDomain: "redux-demo-pruebas.firebaseapp.com",
    databaseURL: "https://redux-demo-pruebas.firebaseio.com",
    projectId: "redux-demo-pruebas",
    storageBucket: "redux-demo-pruebas.appspot.com",
    messagingSenderId: "723814828715",
    appId: "1:723814828715:web:cff66e4ffa1c18e06545ee"
  };

  if ( process.env.NODE_ENV === 'test' ) {
      //testing
      firebase.initializeApp(firebaseConfigTesting);

  } else {
      //dev/prod
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
  };

*/
  //Para grabar información y google Auth Provider
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(); 
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db, 
      googleAuthProvider,
      firebase
  }