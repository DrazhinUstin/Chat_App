// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'chat-d9d8c.firebaseapp.com',
    projectId: 'chat-d9d8c',
    storageBucket: 'chat-d9d8c.appspot.com',
    messagingSenderId: '112037357500',
    appId: '1:112037357500:web:3ade32125468db79efedb9',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
