// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCb2qCA_1_oIHJ5Lf6Y4EWshP9bSrcW4GY",
    authDomain: "safeelephant-1a96d.firebaseapp.com",
    databaseURL:"https://safeelephant-1a96d-default-rtdb.firebaseio.com",
    projectId: "safeelephant-1a96d",
    storageBucket: "safeelephant-1a96d.firebasestorage.app",
    messagingSenderId: "881853527272",
    appId: "1:881853527272:web:0227b8136489f00a90855d",
    measurementId: "G-G43RFGRD8K"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app); 
export { auth, db, realtimeDb };

