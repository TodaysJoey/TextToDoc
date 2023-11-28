<template>
    <div class="bg-black/50 w-full h-full fixed">
        <div class="container flex flex-col bg-white space-y-10 mx-auto my-20 w-4/6 h-2/6 px-7 py-5 rounded-lg">
            <div class="flex space-x-2">
                <span class="text-lg font-semibold">{{ props.title }}</span>
            </div>
            <div class="container max-w-md max-h-96 overflow-auto">
                <div class="content flex flex-col">
                    <input class="border p-2" type="email" id="email" placeholder="이메일을 입력해주세요." v-model="_email" />
                    <input class="border p-2" type="password" id="password" placeholder="패스워드를 입력해주세요."
                        v-model="_password" />
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
import { useRouter } from "vue-router"

const props = defineProps({
    type: String,
    title: String
})

const _email = ref('')
const _password = ref('')

const emit = defineEmits(['response', 'signUpCompl'])

const clickCloseBtn = () => {
    emit('response', false)
}

const clickConfirmBtn = async () => {
    const auth = new AuthInfo();

    let res: (IUser | IError) = await auth.signUpUser(_email.value, _password.value)

    if (res.isSuccess === true) {
        // TODO 회원 가입 완료 후 유저 정보 전달
        // TODO 전역 상태값으로 저장
        emit('signUpCompl', res)

    } else {
        // TODO 회원 가입 실패 시 토스트 메시지 처리
    }

}


</script>


<style scoped></style>