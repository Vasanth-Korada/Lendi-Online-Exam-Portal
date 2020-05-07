import firebase from 'firebase/app'
import 'firebase/firestore';
const config = {
    apiKey: "AIzaSyDN4EgOBJxeT-xi7PElsrXD3VIxQPgk_1o",
    authDomain: "lendishout-bd358-763a1.firebaseapp.com",
    databaseURL: "https://lendishout-bd358-763a1.firebaseio.com",
    projectId: "lendishout-bd358",
    storageBucket: "lendishout-bd358.appspot.com",
    messagingSenderId: "1010746414410",
    appId: "1:1010746414410:web:b6c53a774241ff11c19db3"
};
firebase.initializeApp(config);
export default firebase;

