<script setup lang='ts'>
import { ref } from 'vue'
import AuthInfo from '../assets/ts/auth'


const _email = ref('')
const _password = ref('')

const auth = new AuthInfo();

const signUpUser = () => {
    auth.signUpUser(_email.value, _password.value)
}

const signInUser = () => {
    auth.signInUser(_email.value, _password.value)
}



</script>

<template>
    <div class="container mx-auto my-20">
        <div class="box-content flex flex-col space-y-2 mx-0 my-auto" role="form">
            <input class="border p-2" type="email" id="email" placeholder="이메일을 입력해주세요." v-model="_email" />
            <input class="border p-2" type="password" id="password" placeholder="패스워드를 입력해주세요." v-model="_password" />
            <button class="primary-btn" @click="signInUser">로그인</button>
            <button class="default-btn">비밀번호 재설정</button>
            <div class="box-content flex">
                <button>가입하기</button>
                <button class="sign-in-btn" @click="signUpUser">이메일</button>
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