// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBBvAN2fi3ZbHfY6_pQ9MKqdpGyuRQmzqc',
  authDomain: 'tech-auth76.firebaseapp.com',
  projectId: 'tech-auth76',
  storageBucket: 'tech-auth76.appspot.com',
  messagingSenderId: '776138529312',
  appId: '1:776138529312:web:a09640b32a5a9876a2fa45',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
