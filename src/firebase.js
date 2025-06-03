// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpzPOsfDFbObTGYNI2XlRJPq2BSqv5NQA",
  authDomain: "egitim-ferah.firebaseapp.com",
  projectId: "egitim-ferah",
  storageBucket: "egitim-ferah.firebasestorage.app",
  messagingSenderId: "261618532932",
  appId: "1:261618532932:web:595dd95deb6e178767f211",
  measurementId: "G-MVJ0GF4713"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

