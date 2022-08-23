// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

// Initialize Firebase and Firestore
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const libraryCollection = collection(database, "library");

// add library to firebase
export const addLibraryToFirebase = async (id, library) => {
  const currentDoc = doc(database, "library", `${id}`);
  await setDoc(
    currentDoc,
    { userBooks: { library: [...library] } },
    { merge: true }
  );
};

// add shelf to firebase
export const addShelfToFirebase = async (id, shelf) => {
  const currentDoc = doc(database, "library", `${id}`);
  await setDoc(currentDoc, { userBooks: { shelf: [shelf] } }, { merge: true });
};
