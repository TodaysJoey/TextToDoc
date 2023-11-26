<script setup lang='ts'>
import { ref } from 'vue'
import { AuthInfo, type IUser, type IError } from '../assets/ts/auth'
import { useRouter } from "vue-router"
import AlertModal from '../components/AlertModalItem.vue'

const router = useRouter();

const _email = ref('')
const _password = ref('')
const isOpenModal = ref(true)

const auth = new AuthInfo();

const signUpUser = async () => {
    let res = await auth.signUpUser(_email.value, _password.value)
    // TODO 회원가입 팝업으로 처리
}

const signInUser = async () => {
    let res: (IUser | IError) = await auth.signInUser(_email.value, _password.value)

    if (res.isSuccess === true) {
        // TODO 전역 상태값으로 저장

        router.push({
            path: '/editor',
        });
    } else {
        isOpenModal.value = true;
    }
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
    <AlertModal v-if="isOpenModal === true"></AlertModal>
</template>

<style scoped>
.sign-in-btn {
    margin-left: auto;
}
</style>