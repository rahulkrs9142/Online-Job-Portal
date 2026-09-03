import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbHTUIgkdlelbfkwinLzCwnEX6t9PQET8",
  authDomain: "online-job-portal-3d945.firebaseapp.com",
  projectId: "online-job-portal-3d945",
  storageBucket: "online-job-portal-3d945.firebasestorage.app",
  messagingSenderId: "257349271737",
  appId: "1:257349271737:web:0451af792d53f7a310db68",
  measurementId: "G-XJTXHTEGDW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };