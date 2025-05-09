import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDoC8sRRBbDsfuVcOOo3cO2-VPhwD_5A3A",
    authDomain: "genai-4028a.firebaseapp.com",
    projectId: "genai-4028a",
    storageBucket: "genai-4028a.firebasestorage.app",
    messagingSenderId: "381601954348",
    appId: "1:381601954348:web:53b192d67e0f79989eaf89",
    measurementId: "G-R8165G1WF2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set subscription info in Firestore
async function setSubscription(user, plan) {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      subscription: plan,
    }, { merge: true });
  }
}

// Get subscription info from Firestore
async function getSubscription(user) {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data().subscription || null;
    } else {
      return null;
    }
  }
  return null;
}

// Listen for auth changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log("User signed in:", user);
  } else {
    // User is signed out
    console.log("User signed out");
  }
});

export { auth, db, setSubscription, getSubscription };
