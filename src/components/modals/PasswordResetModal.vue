
<template>
    <Modal isShowCloseBtn>
        <template #title>
            <span class="text-lg font-semibold">{{ props.title }}</span>
        </template>
        <template #content>
            <div class="flex flex-col">
                <input class="border p-2" type="email" id="resetEmail" placeholder="가입한 이메일 주소를 입력해주세요."
                    v-model="resetEmail" />
                <span>입력한 이메일 주소로 비밀번호 재설정 메일이 전송됩니다.</span>
            </div>
        </template>
        <template #footer>
            <button class="bg-blue-600 w-16 p-2 rounded font-bold text-base text-white" @click="confirm">확인</button>
        </template>
    </Modal>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { AuthInfo, type IUser, type IError } from '../../assets/ts/auth'
import Modal from '@/components/ModalItem.vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps({
    type: String,
    title: String
})

const resetEmail = ref('')

const emit = defineEmits(['resetCompl'])

const confirm = async () => {
    const auth = new AuthInfo();

    let res: (IUser | IError) = await auth.resetPassword(resetEmail.value)

    if (res.isSuccess === true) {
        emit('resetCompl', res)
    } else {
        toast.error(`비밀번호 재설정 메일 전송을 실패했어요. (${(res as IError).errorCode}: ${(res as IError).errorMessage})`, {
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

}

</script>


<style scoped></style>