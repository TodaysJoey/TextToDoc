<template>
  <div class="flex flex-nowrap bg-slate-200 editor-content">
    <AccordionItem />
    <div class="basis-5/6 flex flex-col">
      <div class="flex bg-white m-5">
        <div class="basis-80 space-x-4 p-4">
          <img class="inline" :src="profileTmpImage" />
          <span class="pt-2 pb-2" @contextmenu.prevent="showContextMenu($event)">{{ userStore.getLoginUserId() }}</span>
        </div>
        <div class="flex ml-auto space-x-6 p-4">
          <button class="primary-text"><img class="inline mr-2" :src="saveIcon" />저장하기</button>
          <button class="primary-text">
            <img class="inline mr-2" :src="exportIcon" />문서 추출하기
          </button>
        </div>
      </div>
      <div class="editor flex flex-nowrap">
        <div class="bg-white basis-1/2 h-screen ml-5 mr-2 p-4">
          <EditorItem></EditorItem>
        </div>
        <div class="bg-white basis-1/2 h-screen mr-5 ml-2 p-4"></div>
      </div>
    </div>
    <div class="overlay" @click="closeContextMenu" v-if="isShowContext"></div>
    <ContextMenu v-if="isShowContext" :x="menuX" :y="menuY" @response="closeContextMenu"></ContextMenu>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AccordionItem from '@/components/AccordionItem.vue'
import saveIcon from '@/assets/images/save_icon.svg'
import exportIcon from '@/assets/images/export_icon.svg'
import profileTmpImage from '@/assets/images/user_thumb.svg'
import ContextMenu from '@/components/UserDeleteContextMenu.vue'
import EditorItem from '@/components/editor/EditorItem.vue'
import { useUserInfoStore } from '@/stores/user'


const userStore = useUserInfoStore()
const isShowContext = ref(false)
const menuX = ref(0)
const menuY = ref(0)

const showContextMenu = (ev) => {
  ev.preventDefault()
  isShowContext.value = true
  menuX.value = ev.clientX
  menuY.value = ev.clientY
}

const closeContextMenu = () => {
  isShowContext.value = false;
};

</script>

<style scoped>
.editor-content {
  padding-bottom: 0 !important;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 49;
}

.overlay::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
}

.overlay:hover {
  cursor: pointer;
}

</style>
