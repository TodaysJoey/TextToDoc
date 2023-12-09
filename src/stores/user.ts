
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('user', ()=>{
    const info = ref({})
    const getInfo = computed(() => info.value)
    const isLoginStatus = ref(false)
    const getLoginStatus = computed(() => isLoginStatus.value)
    
    function saveUser(obj) {
        info.value = obj
        isLoginStatus.value = true
    }

    return {info, getInfo, saveUser, getLoginStatus}
    
})