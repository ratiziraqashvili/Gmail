import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDYzRNzr0bT6H6wf4E10zoXK-mLMOZ58tA",
  authDomain: "clone-30fb4.firebaseapp.com",
  projectId: "clone-30fb4",
  storageBucket: "clone-30fb4.appspot.com",
  messagingSenderId: "744670281046",
  appId: "1:744670281046:web:7d3ff329ee6a79275c6af7",
  measurementId: "G-53G92NDJ4C"
};

const app = initializeApp(firebaseConfig); 

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };

