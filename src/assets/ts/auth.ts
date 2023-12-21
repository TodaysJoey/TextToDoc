import { initializeApp, type FirebaseApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  deleteUser,
  type Auth,
  type UserCredential,
  type UserInfo,
  OperationType
} from 'firebase/auth'
import Constant from './constant'

interface IUser extends Omit<UserCredential, 'user' | 'providerId' | 'operationType'> {
  isSuccess: boolean
  user?: UserInfo
  providerId?: string | null
  operationType?: (typeof OperationType)[keyof typeof OperationType]
}

interface IError {
  isSuccess: boolean
  errorCode: string
  errorMessage: string
}

const firebaseConfig = Constant.FIREBASE_CONFIG

const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider()

class AuthInfo {
  public app: FirebaseApp
  public auth: Auth

  constructor() {
    this.app = firebaseApp
    this.auth = firebaseAuth
  }

  signIn(email: string, password: string): Promise<IUser> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // 성공
        return authEventHandler.success(
          true,
          userCredential.user,
          userCredential.providerId,
          userCredential.operationType
        )
      })
      .catch((error) => {
        // 실패
        throw authEventHandler.error(false, error.code, error.message)
      })
  }

  signUp(email: string, password: string): Promise<IUser> {
    if (!email || !password) {
      throw new Error('입력항목을 확인해주세요.')
    } else {
      return createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          return authEventHandler.success(
            true,
            userCredential.user,
            userCredential.providerId,
            userCredential.operationType
          )
        })
        .catch((error) => {
          throw authEventHandler.error(false, error.code, error.message)
        })
    }
  }

  signUpWithGoogle(): Promise<IUser> {
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        // FIXME 토큰을 저장해야할까?
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken
        // The signed-in user info.
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        return authEventHandler.success(true, result.user, result.providerId, result.operationType)
      })
      .catch((error) => {
        // FIXME credential 을 어딘가에 저장해야할까?
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);

        throw authEventHandler.error(false, error.code, error.message)
      })
  }

  resetPassword(email: string): Promise<IUser | IError> {
    return sendPasswordResetEmail(this.auth, email)
      .then(() => authEventHandler.success(true))
      .catch((error) => {
        throw authEventHandler.error(false, error.code, error.message)
      })
  }

  deleteUserInfo(): Promise<IUser> {
    return deleteUser(this.auth.currentUser!)
      .then(() => authEventHandler.success(true))
      .catch((error) => {
        throw authEventHandler.error(false, error.code, error.message)
      })
  }
}

class authEventHandler {
  constructor() {}
  static success(
    flag: boolean,
    userInfo?: UserInfo,
    providerId?: string | null,
    opType?: 'link' | 'reauthenticate' | 'signIn'
  ): IUser {
    return {
      isSuccess: flag,
      user: userInfo ?? '',
      providerId: providerId ?? '',
      operationType: opType ?? ''
    } as IUser
  }
  static error(flag: boolean, code: string, msg: string): IError {
    return { isSuccess: flag, errorCode: code, errorMessage: msg } as IError
  }
}

export { AuthInfo }
export type { IUser, IError }
