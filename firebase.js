// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAVfZC1GfEFftMjLMWcvNiMVHAyZrwCqd8",
	authDomain: "uber-clone-73fc7.firebaseapp.com",
	projectId: "uber-clone-73fc7",
	storageBucket: "uber-clone-73fc7.appspot.com",
	messagingSenderId: "462709787560",
	appId: "1:462709787560:web:3c2bb5a8ad4dcfb5bc2b9d",
	measurementId: "G-MMWJK3RSS7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };
