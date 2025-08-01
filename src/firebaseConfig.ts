import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "your domain",
  projectId: "your id",
  storageBucket: "your storage bucket",
  messagingSenderId: "sender id",
  appId: "app id",
  measurementId: "measurement id"
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

