import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8rjhVxx2OEJQOsk-qL6CYlybxKWXIR2w",
  authDomain: "astrogenie-4414d.firebaseapp.com",
  databaseURL: "https://astrogenie-4414d-default-rtdb.firebaseio.com",
  projectId: "astrogenie-4414d",
  storageBucket: "astrogenie-4414d.appspot.com",
  messagingSenderId: "711547398143",
  appId: "1:711547398143:web:ff951b08b8278ae3ad69ca",
  measurementId: "G-ZM9QK004VG"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);

// Initialize Firestore with persistence
const db = initializeFirestore(app, {
  cache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

const storage = getStorage(app);

// Log initialization
console.log('Firebase app initialized:', !!app);
console.log('Firebase auth initialized:', !!auth);
console.log('Firebase db initialized:', !!db);

export { auth, db, storage };
export default app;
