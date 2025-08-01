import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBbP1dlMHyIL_VLpwU-TnzVSrvYkKNVSxM",
  authDomain: "orgu-uygulamam.firebaseapp.com",
  projectId: "orgu-uygulamam",
  storageBucket: "orgu-uygulamam.firebasestorage.app",
  messagingSenderId: "519409974283",
  appId: "1:519409974283:web:d4feb23c731805be6ddb0e",
  measurementId: "G-1J4EMBWX5T"
};

let app;
let auth;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  app = getApp();
  auth = getAuth(app); // tekrar initialize etme!
}

export { app, auth };

