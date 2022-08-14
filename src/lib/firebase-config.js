import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAcCFXAxRInOomYUjycR5EtZA_4MZT_eZo',
  authDomain: 'notes-80636.firebaseapp.com',
  projectId: 'notes-80636',
  storageBucket: 'notes-80636.appspot.com',
  messagingSenderId: '1022916463074',
  appId: '1:1022916463074:web:08a899c0dd619a17c251bb',
  measurementId: 'G-V2BXWRS43Q',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const gitProvider = new GithubAuthProvider();
