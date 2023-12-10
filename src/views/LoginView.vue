<template>
  <div class="container mx-auto flex flex-col mt-10 mb-10 content">
    <div class="flex flex-col space-y-2 mx-0 my-auto" role="form">
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
      <button class="primary-btn" @click="signInUser">로그인</button>
      <button class="default-btn" @click="resetPassword">비밀번호 재설정</button>
      <div class="box-content flex">
        <button>가입하기</button>
        <button class="sign-in-btn" @click="(ev) => showSignUpModal(ev)">E-mail</button>
        <button class="sign-in-btn" @click="signUpWithGoogle">Google</button>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <AlertModal
      v-if="isAlertVisible === true"
      :isVisible="isAlertVisible"
      :msg="changeAlertMessage"
      :msgType="'warning'"
      @response="
        (v) => {
          isAlertVisible = v
        }
      "
    >
    </AlertModal>
  </Teleport>

  <SignUpModal
    v-if="modalType == 'E-mail'"
    :title="modalTitle"
    @signUpCompl="
      (res) => {
        runModalCallback(res)
      }
    "
  ></SignUpModal>
  <ResetModal
    v-if="modalType == 'reset'"
    :title="modalTitle"
    @resetCompl="
      (res) => {
        runModalCallback(res)
      }
    "
  >
  </ResetModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { AuthInfo, type IUser, type IError } from '../assets/ts/auth'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { useUserInfoStore } from '@/stores/user'
import { useServiceStore } from '@/stores/service'
import 'vue3-toastify/dist/index.css'
import AlertModal from '@/components/AlertModalItem.vue'
import SignUpModal from '@/components/modals/SignUpModal.vue'
import ResetModal from '@/components/modals/PasswordResetModal.vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const isAlertVisible = ref(false)
const isShowModal = ref(false)

const modalType = ref('')
const modalTitle = ref('')

const auth = new AuthInfo()
const store = useUserInfoStore()
const serviceStore = useServiceStore()

const changeAlertMessage = computed(() => {
  return isAlertVisible.value ? '로그인에 실패하였습니다.' : ''
})

const showSignUpModal = (ev: any) => {
  // 회원가입 팝업으로 처리
  modalType.value = ev.target.innerText
  modalTitle.value = ev.target.innerText + ' 회원 가입'
  serviceStore.setShowModalStatus(true)
}

const signInUser = async () => {
  try {
    let res: IUser = await auth.signIn(email.value, password.value)

    // 전역 상태값으로 저장
    store.saveUser(res)

    router.push({
      path: '/editor'
    })
  } catch (e) {
    // TODO 토스트 메시지로 변경
    console.error((e as IError).errorCode, (e as IError).errorMessage)
    isAlertVisible.value = true
  }
}

const signUpWithGoogle = async () => {
  try {
    let res: IUser = await auth.signUpWithGoogle()
    store.saveUser(res)

    router.push({
      path: '/editor'
    })
  } catch (e) {
    // TODO 토스트 메시지로 변경
    console.error((e as IError).errorCode, (e as IError).errorMessage)
    isAlertVisible.value = true
  }
}

const resetPassword = () => {
  modalType.value = 'reset'
  modalTitle.value = '비밀번호 재설정'
  serviceStore.setShowModalStatus(true)
}

const runModalCallback = (res: any) => {
  if (modalType.value == 'email' && res.isSuccess === true) {
    if (res.isSuccess === true) {
      email.value = res.user.email
      isShowModal.value = false

      toast.success('회원 가입을 축하드려요! 가입한 계정으로 로그인 해보세요.', {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
  }

  if (modalType.value == 'reset' && res.isSuccess === true) {
    isShowModal.value = false
    toast.success('비밀번호 재설정 메일을 전달했어요. 메일함을 확인해보세요.', {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }
}
</script>

<style scoped>
.sign-in-btn {
  margin-left: auto;
}
</style>
