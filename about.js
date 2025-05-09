import { auth } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");

  // Check if user is logged in
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      console.log("About Us: No user logged in, redirecting to index.html");
      window.location.href = "index.html";
    }
  });

  // Logout button functionality
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  });
});
