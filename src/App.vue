<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderItem from './components/HeaderItem.vue';
import FooterItem from './components/FooterItem.vue';
</script>

<template>
  <div class="wrap-container">
    <div class="flex flex-col">
      <HeaderItem class="header" />
      <RouterView class="content" />
      <FooterItem class="footer" />
    </div>

  </div>
</template>

<style scoped>
.wrap-container {
  height: auto;
  min-height: 100%;
}

.content {
  min-height: 600px;
  padding-bottom: 140px;
}

.header {
  padding: 20px;
  height: 60px;
}

.footer {
  position: relative;
  height: 50px;
  transform: translateY(0%);
  padding: 10px;
}
</style>
