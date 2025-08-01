import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "your domain",
  projectId: "your id",
  storageBucket: "your storage bucket",
  messagingSenderId: "sender id",
  appId: "app id",
  measurementId: "measurement id"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getApps().length === 0
  ? initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    })
  : getAuth(app);

  const db = getFirestore(app);
  export { app, auth, db };


