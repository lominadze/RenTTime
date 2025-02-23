import { auth, googleProvider, facebookProvider } from "./firebase-config.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    linkWithCredential,
    EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// "auth/account-exists-with-different-credential" შეცდომის გამართვა
function handleAccountExistsError(error, email, password) {
    if (error.code === 'auth/account-exists-with-different-credential') {
        // Get the provider that was used to create the account (Google or Facebook)
        const provider = error.credential.providerId;

        // Create a new credential using the email and password
        const credential = EmailAuthProvider.credential(email, password);

        // Link the account with the new credential
        return auth.currentUser.linkWithCredential(credential)
            .then(() => {
                // Successfully linked the accounts
                showMessage("loginMessage", "ანგარიში წარმატებით დაკავშირებულია!", "success");
                window.location.href = 'index.html'; // Redirect to homepage after successful linking
            })
            .catch((linkError) => {
                const errorMessage = errorMessages[linkError.code] || "შეცდომა: " + linkError.message;
                showMessage("loginMessage", errorMessage, "error");
            });
    }
    return Promise.reject(error); // If not account-exists error, reject the promise
}

// Login function (email/password login)
function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const username = userCredential.user.displayName;
            localStorage.setItem('username', username);
            showMessage("loginMessage", "შესვლა წარმატებით დასრულდა!", "success");
            return userCredential;
        })
        .catch((error) => {
            // Handle the specific error
            const errorMessage = errorMessages[error.code] || "შეცდომა: " + error.message;
            showMessage("loginMessage", errorMessage, "error");

            // If the error is 'auth/account-exists-with-different-credential', try to link the accounts
            return handleAccountExistsError(error, email, password);
        });
}

// Google login
function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem('username', user.displayName);
            window.location.href = 'index.html'; // Redirect to homepage
            showMessage("loginMessage", "Google-ით შესვლა წარმატებით დასრულდა!", "success");
            return user;
        })
        .catch((error) => {
            const errorMessage = errorMessages[error.code] || "შეცდომა: " + error.message;
            showMessage("loginMessage", errorMessage, "error");
        });
}

// Facebook login
function signInWithFacebook() {
    return signInWithPopup(auth, facebookProvider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem('username', user.displayName);
            window.location.href = 'index.html'; // Redirect to homepage
            showMessage("loginMessage", "Facebook-ით შესვლა წარმატებით დასრულდა!", "success");
            return user;
        })
        .catch((error) => {
            const errorMessage = errorMessages[error.code] || "შეცდომა: " + error.message;
            showMessage("loginMessage", errorMessage, "error");
        });
}

// Show messages to users
function showMessage(elementId, message, type) {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;
    messageElement.className = "message " + type;
}

export { loginUser, signInWithGoogle, signInWithFacebook };
