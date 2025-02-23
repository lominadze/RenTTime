import { auth, googleProvider, facebookProvider } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile, linkWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Function to handle login with Google
function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem('username', user.displayName); // Store Google username
            window.location.href = 'index.html'; // Redirect to homepage
            showMessage("loginMessage", "Google-ით შესვლა წარმატებით დასრულდა!", "success");
            return user; // Return user for further processing
        })
        .catch((error) => {
            const errorMessage = errorMessages[error.code] || "შეცდომა: " + error.message;
            if (error.code === "auth/account-exists-with-different-credential") {
                // Handle case where account exists with different credential
                const email = error.email;
                const pendingCred = error.credential;

                // Ask the user to sign in with the other provider (Google or Facebook)
                if (error.providerId === "google.com") {
                    signInWithPopup(auth, googleProvider).then((googleResult) => {
                        const user = googleResult.user;
                        user.linkWithCredential(pendingCred).then(() => {
                            localStorage.setItem('username', user.displayName);
                            window.location.href = 'index.html';
                        }).catch((linkError) => {
                            showMessage("loginMessage", "გაუმართავი: " + linkError.message, "error");
                        });
                    });
                } else if (error.providerId === "facebook.com") {
                    signInWithPopup(auth, facebookProvider).then((facebookResult) => {
                        const user = facebookResult.user;
                        user.linkWithCredential(pendingCred).then(() => {
                            localStorage.setItem('username', user.displayName);
                            window.location.href = 'index.html';
                        }).catch((linkError) => {
                            showMessage("loginMessage", "გაუმართავი: " + linkError.message, "error");
                        });
                    });
                }
            } else {
                showMessage("loginMessage", errorMessage, "error");
            }
        });
}
