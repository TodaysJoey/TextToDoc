<template>
  <Modal isShowCloseBtn>
    <template #title>
      <span class="text-lg font-semibold">{{ props.title }}</span>
    </template>
    <template #content>
      <div class="flex flex-col">
        <input
          class="border p-2"
          type="email"
          id="email"
          placeholder="이메일을 입력해주세요."
          v-model="email"
        />
        <input
          class="border p-2"
          type="password"
          id="password"
          placeholder="패스워드를 입력해주세요."
          v-model="password"
        />
      </div>
    </template>
    <template #footer>
      <button class="bg-blue-600 w-16 p-2 rounded font-bold text-base text-white" @click="confirm">
        확인
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/ModalItem.vue'
import { AuthInfo, type IUser, type IError } from '../../assets/ts/auth'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const props = defineProps({
  type: String,
  title: String
})

const emit = defineEmits(['signUpCompl', 'closeModal'])

const email = ref('')
const password = ref('')

const confirm = async () => {
  const auth = new AuthInfo()

  let res: IUser | IError = await auth.signUp(email.value, password.value)

  if (res.isSuccess === true) {
    emit('signUpCompl', res)
  } else {
    toast.error(
      `가입에 실패했어요. (${(res as IError).errorCode}: ${(res as IError).errorMessage})`,
      {
        position: toast.POSITION.BOTTOM_CENTER
      }
    )
  }
}
</script>

<style scoped></style>
