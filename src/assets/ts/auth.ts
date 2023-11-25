import { initializeApp, type FirebaseApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, type Auth} from "firebase/auth"

interface IUser{
    email: string,
    password: string,
}

const firebaseConfig = {
    apiKey: "AIzaSyD5VvCYAVxAbEIXBCIN5VlaQC9GDgzhISo",
    authDomain: "textodoc-6d122.firebaseapp.com",
    projectId: "textodoc-6d122",
    storageBucket: "textodoc-6d122.appspot.com",
    messagingSenderId: "238773738979",
    appId: "1:238773738979:web:ce5ce8e67fb6120d5b94d6",
    measurementId: "G-0W9CREFLG9"
}

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)

export default class AuthInfo {
    public app: FirebaseApp
    public auth: Auth
    
    constructor(){
        this.app = firebaseApp
        this.auth = firebaseAuth
    }

    signUpUser(email: string, password: string) {
        createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
        });
    }

    signInUser(email: string, password: string){
        signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

}


// export { app, auth }