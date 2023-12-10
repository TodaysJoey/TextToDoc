<template>
  <teleport to="body">
    <div v-if="serviceStore.isShowModal" class="modal">
      <div
        class="container flex flex-col bg-white space-y-10 mx-auto my-20 w-4/6 h-2/6 px-7 py-5 rounded-lg"
      >
        <div class="flex space-x-2">
          <slot name="title"></slot>
        </div>
        <div class="container max-w-md max-h-96 overflow-auto">
          <slot name="content"></slot>
        </div>
        <div class="flex space-x-2">
          <slot name="footer"></slot>
          <button
            v-if="props.isShowCloseBtn"
            class="border border-blue-600 w-16 p-2 rounded font-bold text-base text-blue-600"
            @click="closeModal"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useServiceStore } from '@/stores/service'

const props = defineProps({
  isShowCloseBtn: Boolean
})

const serviceStore = useServiceStore()

const closeModal = async () => {
  serviceStore.setShowModalStatus(false)
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
