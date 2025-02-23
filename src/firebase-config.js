import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js"; 

const firebaseConfig = {
    apiKey: "AIzaSyAST02m9FRi3hRVRQG2sm4aw2QJ53kj6aQ",
    authDomain: "rentime-6ea90.firebaseapp.com",
    projectId: "rentime-6ea90",
    storageBucket: "rentime-6ea90.appspot.com",
    messagingSenderId: "12194385074",
    appId: "1:12194385074:web:e4a67fbb5ad9d01b0ebc1e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Configuring Facebook Provider
facebookProvider.setCustomParameters({
  'display': 'popup'
});

export { auth, googleProvider, facebookProvider };
