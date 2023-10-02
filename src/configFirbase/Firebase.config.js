import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAT3ct30NLPN6Beyu-FgbWPCZMKM2pB8ck",
    authDomain: "auth-practice-project-9edbd.firebaseapp.com",
    projectId: "auth-practice-project-9edbd",
    storageBucket: "auth-practice-project-9edbd.appspot.com",
    messagingSenderId: "1058831204849",
    appId: "1:1058831204849:web:d525e1fe414ffb2a79c450"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth