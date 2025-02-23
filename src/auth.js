import { auth, googleProvider, facebookProvider } from "./firebase-config.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    linkWithCredential,
    EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const errorMessages = {
    "auth/weak-password": "შეცდომა: პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო",
    "auth/email-already-in-use": "შეცდომა: ეს ელ. ფოსტა უკვე დარეგისტრირებულია",
    "auth/invalid-email": "შეცდომა: არასწორი ელ. ფოსტა",
    "auth/user-not-found": "შეცდომა: ასეთი მომხმარებელი არ არსებობს",
    "auth/wrong-password": "შეცდომა: პაროლი არასწორია",
    "auth/too-many-requests": "შეცდომა: ძალიან ბევრი მცდელობა. სცადეთ შემდეგში",
    "auth/cancelled-popup-request": "შეცდომა: ფანჯრის დახურვა გაუმართავია",
    "auth/invalid-credential": "შეცდომა: არასწორი სერთიფიკატი",
    "auth/account-exists-with-different-credential": "ამ ელ. ფოსტას უკვე აქვს სხვადასხვა ავტორიზაცია. სცადეთ სხვა მეთოდი."
};

// რეგისტრაცია
function registerUser(email, password, username) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Update Firebase user profile with username
            return updateProfile(userCredential.user, {
                displayName: username
            }).then(() => {
                localStorage.setItem('username', username);
                showMessage("registerMessage", "რეგისტრაცია წარმატებით შესრულდა!", "success");
                return userCredential;
            });
        })
        .catch((error) => {
            const errorMessage = errorMessages[error.code] || "შეცდომა: " + error.message;
            showMessage("registerMessage", errorMessage, "error");
            throw error;
        });
}

// შესვლა
function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const username = userCredential.user.displayName;
            localStorage.setItem('username', username);
            showMessage("loginMessage", "შესვლა წარმატებით დასრულდა!", "success");
            return userCredential;
        })
        .catch((error) => {
            const errorMessage = errorMessages[error.code] || "შეცდომა: " + error.message;
            showMessage("loginMessage", errorMessage, "error");
            throw error;
        });
}

// Google შესვლა
function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem('username', user.displayName);
            window.location.href = 'index.html'; // Redirect to homepage
            showMessage("loginMessage", "Google-ით შესვლა წარმატებით დასრულდა!", "success");
            return user; // Return user for further processing
        })
        .catch((error) => {
            const errorMessage = errorMessages[error.code] || "შეცდომა: " + error.message;
            showMessage("loginMessage", errorMessage, "error");
        });
}

// Facebook შესვლა
function signInWithFacebook() {
    return signInWithPopup(auth, facebookProvider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem('username', user.displayName);
            window.location.href = 'index.html'; // Redirect to homepage
            showMessage("loginMessage", "Facebook-ით შესვლა წარმატებით დასრულდა!", "success");
            return user; // Return user for further processing
        })
        .catch((error) => {
            const errorMessage = errorMessages[error.code] || "შეცდომა: " + error.message;
            showMessage("loginMessage", errorMessage, "error");
        });
}

// Account linking - if email exists with different credentials
function linkAccountWithEmail(email, password) {
    const credential = EmailAuthProvider.credential(email, password);
    return linkWithCredential(auth.currentUser, credential)
        .then(() => {
            showMessage("loginMessage", "ანგარიში წარმატებით დაკავშირებულია!", "success");
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

export { registerUser , loginUser , signInWithGoogle, signInWithFacebook, linkAccountWithEmail };
