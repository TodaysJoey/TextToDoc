import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type IUser } from '@/assets/ts/auth'

export const useUserInfoStore = defineStore('user', () => {
  const info = ref({})
  const isLoginStatus = ref(false)

  function getLoginStatus() {
    return isLoginStatus.value
  }

  function getLoginUserId() {
    return (info.value as IUser).user?.email
  }

  function saveUser(obj) {
    info.value = obj
    isLoginStatus.value = true
  }

  function getInfo() {
    return info.value
  }

  function deleteUserInfo() {
    info.value = {}
    isLoginStatus.value = false
  }

  return { info, getInfo, getLoginUserId, saveUser, getLoginStatus, deleteUserInfo }
})
