<template>
  <div class="basis-1/6 mt-5 ml-5 p-5 h-screen bg-white divide-y-2">
    <div class="card" v-for="(item, i) in shortcutList" :key="i">
      <div class="card-header p-3" @click="item.open = !item.open">
        <span>{{ item.title }}</span>
        <img class="inline float-right" :src="item.open === true ? openIcon : closeIcon" />
      </div>
      <div class="card-body p-3" v-show="item.open">
        <!-- 버튼 컨텐츠 -->
        <button class="border">버튼!</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import closeIcon from '@/assets/images/accordion_close.svg'
import openIcon from '@/assets/images/accordion_open.svg'

interface IShortcut {
  title: string
  open: boolean
}

const shortcutList = ref<IShortcut[]>([
  { title: '제목', open: false },
  { title: '표', open: false },
  { title: '차례', open: false },
  { title: '그림', open: false },
  { title: '캡션', open: false },
  { title: '구분선', open: false }
])
</script>

<style scoped></style>
