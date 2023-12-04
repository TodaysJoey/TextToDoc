
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('user', ()=>{
    const info = ref({})
    const getInfo = computed(() => info.value)
    
    function saveUser(obj: any) {
        info.value = obj
    }

    return {info, getInfo, saveUser}
    
})