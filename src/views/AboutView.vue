<template>
  <div class="container mx-auto flex flex-col mt-10 content">
    <div class="flex flex-row justify-around mx-auto bg-blue-700">
      <div class="title">
        <img src="../assets/images/example.gif" alt="Example video" width="500" height="100" />
      </div>
      <div class="px-10 py-5 my-auto">
        <p class="text-5xl text-right text-white">키보드로<br />문서를 완성해보세요!</p>
        <p class="text-right text-white">
          At lacus vitae nulla sagittis scelerisque nisl. <br />Pellentesque duis cursus vestibulum,
          facilisi ac, sed faucibus.
        </p>
      </div>
    </div>
    <div class="flex flex-col mx-auto m-20">
      <p class="text-center text-xs text-slate-300">Rhoncus, accumsan dictum</p>
      <p class="p-1 text-3xl text-center font-bold">문서 편집기가 없어도</p>
      <div class="flex flex-row mx-auto m-10">
        <div>
          <p class="font-bold text-center">docx, pdf 확장자 지원</p>
          <div class="detail-text-box">
            A tristique facilisi gravida at felis. Sed ornare arcu, tortor hendrerit etiam vulputate
            libero tellus. Etiam nu
          </div>
        </div>
        <div>
          <p class="font-bold text-center">임시 저장하기</p>
          <div class="detail-text-box">
            A tristique facilisi gravida at felis. Sed ornare arcu, tortor hendrerit etiam vulputate
            libero tellus. Etiam nu
          </div>
        </div>
        <div>
          <p class="font-bold text-center">Aenean condimentum</p>
          <div class="detail-text-box">
            A tristique facilisi gravida at felis. Sed ornare arcu, tortor hendrerit etiam vulputate
            libero tellus. Etiam nu
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//import { ref } from 'vue'
</script>

<style scoped>
.detail-text-box {
  width: 200px;
  font-size: 10px;
  text-align: center;
}
</style>
