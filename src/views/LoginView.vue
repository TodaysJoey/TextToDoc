<template>
    <div class="container mx-auto my-20">
        <div class="box-content flex flex-col space-y-2 mx-0 my-auto" role="form">
            <input class="border p-2" type="email" id="email" placeholder="이메일을 입력해주세요." v-model="_email" />
            <input class="border p-2" type="password" id="password" placeholder="패스워드를 입력해주세요." v-model="_password" />
            <button class="primary-btn" @click="signInUser">로그인</button>
            <button class="default-btn">비밀번호 재설정</button>
            <div class="box-content flex">
                <button>가입하기</button>
                <button class="sign-in-btn" @click="(ev) => showSignUpModal(ev)">E-mail</button>
                <button class="sign-in-btn">Google</button>
            </div>

        </div>
    </div>
    <AlertModal v-if="isAlertVisible === true" :isVisible="isAlertVisible" :msg="changeAlertMessage" :msgType="'warning'"
        @response="(v) => { isAlertVisible = v }">
    </AlertModal>

    <ModalItem v-if="isShowModal === true" :type="signUpType" :title="modalTitle" @response="(v) => { isShowModal = v }"
        @signUpCompl="(res) => { _email = res.user.email; isShowModal = false }">
    </ModalItem>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import { AuthInfo, type IUser, type IError } from '../assets/ts/auth'
import { useRouter } from "vue-router"
import AlertModal from '../components/AlertModalItem.vue'
import ModalItem from '@/components/ModalItem.vue'

const router = useRouter();

const _email = ref('')
const _password = ref('')
const isAlertVisible = ref(false)
const isShowModal = ref(false)

const signUpType = ref('')
const modalTitle = ref('')

const auth = new AuthInfo();


const changeAlertMessage = computed(() => {
    return isAlertVisible.value ? '로그인에 실패하였습니다.' : ''
})

const showSignUpModal = (ev: any) => {
    console.log(ev);
    // let res = await auth.signUpUser(_email.value, _password.value)
    // TODO 회원가입 팝업으로 처리
    signUpType.value = ev.target.innerText;
    modalTitle.value = ev.target.innerText + ' 회원 가입';
    isShowModal.value = true;

}

const signInUser = async () => {
    let res: (IUser | IError) = await auth.signInUser(_email.value, _password.value)

    if (res.isSuccess === true) {
        // TODO 전역 상태값으로 저장

        router.push({
            path: '/editor',
        });
    } else {
        // res.errorCode
        // res.errorMessage
        isAlertVisible.value = true;
    }
}

</script>

<style scoped>
.sign-in-btn {
    margin-left: auto;
}
</style>