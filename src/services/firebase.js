
import firebase from 'firebase';

//const clientId = "74129168467-doalg5j1qe0b6mm77f6iq9lt7e22opso.apps.googleusercontent.com"

const firebaseConfig = {
    apiKey: "AIzaSyDYkZg2aEuErg8v3CHeGolhTEbLEcGD2sk",
    authDomain: "auth.fablefrog.com",
    projectId: "fablefrog-auth",
    storageBucket: "fablefrog-auth.appspot.com",
    messagingSenderId: "1021054701797",
    appId: "1:1021054701797:web:9693e89d356112927b440c"
};

firebase.initializeApp(firebaseConfig);

export default firebase;