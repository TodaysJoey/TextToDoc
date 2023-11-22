<script setup lang='ts'>
import { ref } from 'vue'
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyD5VvCYAVxAbEIXBCIN5VlaQC9GDgzhISo",
    authDomain: "textodoc-6d122.firebaseapp.com",
    projectId: "textodoc-6d122",
    storageBucket: "textodoc-6d122.appspot.com",
    messagingSenderId: "238773738979",
    appId: "1:238773738979:web:ce5ce8e67fb6120d5b94d6",
    measurementId: "G-0W9CREFLG9"

}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
// import { app, auth } from '../assets/ts/firebase'


const _email = ref('')
const _password = ref('')


const signUpForm = () => {
    createUserWithEmailAndPassword(auth, _email.value, _password.value)
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



</script>

<template>
    <div class="container mx-auto my-20">
        <div class="box-content flex flex-col space-y-2 mx-0 my-auto" role="form">

            <input class="border p-2" type="email" id="email" placeholder="이메일을 입력해주세요." :value="_email" />
            <input class="border p-2" type="password" id="password" placeholder="패스워드를 입력해주세요." :value="_password" />
            <button class="primary-btn">로그인</button>
            <button class="default-btn">비밀번호 재설정</button>
            <div class="box-content flex">
                <button>가입하기</button>
                <button class="sign-in-btn" @click="signUpForm">이메일</button>
                <button class="sign-in-btn">구글</button>
            </div>

        </div>
    </div>
</template>

<style scoped>
.sign-in-btn {
    margin-left: auto;
}
</style>