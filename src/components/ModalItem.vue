<template>
    <div class="modal">
        <div class="container flex flex-col bg-white space-y-10 mx-auto my-20 w-4/6 h-2/6 px-7 py-5 rounded-lg">
            <div class="flex space-x-2">
                <span class="text-lg font-semibold">{{ props.title }}</span>
            </div>
            <div class="container max-w-md max-h-96 overflow-auto">
                <div class="flex flex-col" v-if="props.type === 'email'">
                    <input class="border p-2" type="email" id="email" placeholder="이메일을 입력해주세요." v-model="_email" />
                    <input class="border p-2" type="password" id="password" placeholder="패스워드를 입력해주세요."
                        v-model="_password" />
                </div>
                <div class="flex flex-col" v-if="props.type === 'reset'">
                    <input class="border p-2" type="email" id="resetEmail" placeholder="가입한 이메일 주소를 입력해주세요."
                        v-model="_resetEmail" />
                    <span>입력한 이메일 주소로 비밀번호 재설정 메일이 전송됩니다.</span>
                </div>
            </div>
            <div class="flex space-x-2">
                <button class="bg-blue-600 w-16 p-2 rounded font-bold text-base text-white"
                    @click="clickConfirmBtn">확인</button>
                <button class="border border-blue-600 w-16 p-2 rounded font-bold text-base text-blue-600"
                    @click="clickCloseBtn">닫기</button>
            </div>
        </div>

    </div>
</template>


<script setup lang='ts'>
import { ref } from 'vue'
import { AuthInfo, type IUser, type IError } from '../assets/ts/auth'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps({
    type: String,
    title: String
})

const _email = ref('')
const _password = ref('')
const _resetEmail = ref('')

const emit = defineEmits(['response', 'signUpCompl', 'resetCompl'])

const clickCloseBtn = () => {
    emit('response', false)
}

const clickConfirmBtn = async () => {
    const auth = new AuthInfo();

    if (props.type == 'email') {
        let res: (IUser | IError | any) = await auth.signUpUser(_email.value, _password.value)

        if (res.isSuccess === true) {
            emit('signUpCompl', res)
        } else {
            toast.error(`가입에 실패했어요. (${res.errorCode}: ${res.errorMessage})`, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }


    }

    if (props.type == 'reset') {
        let res: any = await auth.sendMailForPasswordReset(_resetEmail.value)

        if (res.isSuccess === true) {
            emit('resetCompl', res)
        } else {
            toast.error(`비밀번호 재설정 메일 전송을 실패했어요. (${res.errorCode}: ${res.errorMessage})`, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }

    }


}


</script>


<style scoped>
.modal {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 30px;
    box-shadow: 0 4px 16px #00000026;
}
</style>