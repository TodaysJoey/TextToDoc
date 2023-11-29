import { initializeApp, type FirebaseApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,
        sendPasswordResetEmail, type Auth, type UserCredential} from "firebase/auth"

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
const provider = new GoogleAuthProvider()


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

    signUpWithGoogle():any {
        return signInWithPopup(this.auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...

            const signInInfo: IUser = {
                isSuccess: true,
                user: result.user,
                providerId: result.providerId,
                operationType: result.operationType
            }


            console.log(credential)
            console.log(token)
            
            return signInInfo;
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...

            console.log(error)
            console.log(credential)

            const errorMsg:IError= {isSuccess: false, errorCode: error.code, errorMessage: error.message}
            console.error(errorMsg)

            return errorMsg
        })
    }

    sendMailForPasswordReset(email: string) {
        return sendPasswordResetEmail(this.auth, email)
        .then(()=>{
            // TODO 토스트 메시지로 전송 완료 알림
            return {isSuccess: true}
        })
        .catch((error)=>{
            const errorMsg:IError= {isSuccess: false, errorCode: error.code, errorMessage: error.message}
            console.error(errorMsg)

            return errorMsg

        })

    }

}



export { AuthInfo }
export type { IUser, IError }
