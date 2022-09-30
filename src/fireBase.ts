// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyCWYMunwd2wqQDIu02vypGCWYc4CWA8WHI",

    authDomain: "jimovies-app.firebaseapp.com",

    projectId: "jimovies-app",

    storageBucket: "jimovies-app.appspot.com",

    messagingSenderId: "955438550804",

    appId: "1:955438550804:web:a4d818447b27cf1472bc01"

};


// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp;