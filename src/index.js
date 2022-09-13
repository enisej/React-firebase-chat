import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAmLlvrobTVIVU18Tqeku4XvmpOVYbpdIc",
    authDomain: "chat-react-c420a.firebaseapp.com",
    projectId: "chat-react-c420a",
    storageBucket: "chat-react-c420a.appspot.com",
    messagingSenderId: "358316084005",
    appId: "1:358316084005:web:9b5c7095bd0f8226e228cc",
    measurementId: "G-5G6YHH58XK"

});

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
    <Context.Provider value={{
        firebase,
        auth,
        firestore
    }}>
        <App />
    </Context.Provider>,
);

