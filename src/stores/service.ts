import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useServiceStore = defineStore('service', () => {
  const isShowModal = ref(false)

  const setShowModalStatus = (value) => {
    isShowModal.value = value
  }

  return { isShowModal, setShowModalStatus }
})
