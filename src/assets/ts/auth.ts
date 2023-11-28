import { initializeApp, type FirebaseApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, type Auth, type UserCredential} from "firebase/auth"

interface IUser extends UserCredential {
    isSuccess: boolean
}

interface IError {
    isSuccess: boolean
    errorCode: string
    errorMessage: string
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

class AuthInfo {
    public app: FirebaseApp
    public auth: Auth
    
    constructor(){
        this.app = firebaseApp
        this.auth = firebaseAuth
    }

    signUpUser(email: string, password: string):(Promise<IUser|IError>) {
        return createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {

            const signUpInfo: IUser = {
                isSuccess: true,
                user: userCredential.user,
                providerId: userCredential.providerId,
                operationType: userCredential.operationType
            }

            console.log(signUpInfo);
            return signUpInfo;
            
        })
        .catch((error) => {
            const errorMsg:IError= {isSuccess: false, errorCode: error.code, errorMessage: error.message}
            console.error(errorMsg)
            return errorMsg
        });
    }

    signInUser(email: string, password: string):(Promise<IUser|IError>){
        return signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
            // 성공
            const signInInfo: IUser = {
                isSuccess: true,
                user: userCredential.user,
                providerId: userCredential.providerId,
                operationType: userCredential.operationType
            }

            console.log(signInInfo)
            
            return signInInfo;
        })
        .catch((error) => {
            // 실패 
            const errorMsg:IError= {isSuccess: false, errorCode: error.code, errorMessage: error.message}
            console.error(errorMsg)
            return errorMsg
        });
    }

}



export { AuthInfo }
export type { IUser, IError }
