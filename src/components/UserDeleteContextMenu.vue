<template>
    <div
          class="fixed z-50 context-menu"
          :style="{ top: y + 'px', left: x + 'px' }"
      >
        <div @click="showUserDeleteAlert">
          계정 삭제
        </div>
      </div>
      <AlertModalItem v-if="isShowDeletePopup" :msgType="'warning'" :msg="'계정을 삭제하시겠습니까?'" @response="(v) => { runModalAfter(v) }"></AlertModalItem>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useUserInfoStore } from '@/stores/user'
import { AuthInfo, type IUser, type IError } from '../assets/ts/auth'
import { toast } from 'vue3-toastify'
import AlertModalItem from '@/components/AlertModalItem.vue'
import router from '@/router'

const userStore = useUserInfoStore()
const isShowDeletePopup = ref(false)

const { x, y } = defineProps(['x', 'y'])
const emit = defineEmits(['response'])

const showUserDeleteAlert = () => {
    isShowDeletePopup.value = true
}

const runModalAfter = async (res:boolean) => {
  isShowDeletePopup.value = false

  if(res === true) await deleteUser()
  else emit('response', false)
}

const deleteUser = async ()=>{
  const auth = new AuthInfo()
  try {
    let res: IUser = await auth.deleteUserInfo();
    if(res.isSuccess) {
      await toast.success('계정을 삭제했어요 :(', {
        position: toast.POSITION.BOTTOM_CENTER
      })
      userStore.deleteUserInfo()
      router.push({path:'/'})
    }
  } catch(e) {
    console.error((e as IError).errorCode, (e as IError).errorMessage)
  }
  emit('response', false)
}

</script>

<style scoped>
.context-menu {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 150px;
}

.context-menu div {
  padding: 10px;
  cursor: pointer;
}

.context-menu div:hover {
  background-color: #f0f0f0;
}

</style>