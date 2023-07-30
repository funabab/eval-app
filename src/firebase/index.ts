import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from "@env";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseFunction = getFunctions(firebaseApp);

export const signInWithGoogle = async () => {
  const payload = await GoogleSignin.signIn();
  const credential = GoogleAuthProvider.credential(payload.idToken);
  await signInWithCredential(firebaseAuth, credential);
};

export const firebaseErrors: Record<string, string> = {
  "auth/wrong-password": "Email or password is incorrect",
  "auth/user-not-found": "Email or password is incorrect",
};
