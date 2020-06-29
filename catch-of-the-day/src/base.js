import Rebase from 're-base';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "",
    authDomain: "catch-of-the-day-tm1.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-tm1.firebaseio.com",
    projectId: "catch-of-the-day-tm1",
    storageBucket: "catch-of-the-day-tm1.appspot.com",
    messagingSenderId: "546959145032",
    appId: "1:546959145032:web:96e3e0df88b6f9237a407d",
    measurementId: "G-9ED0ZLMBX5"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;