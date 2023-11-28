<template>
    <div class="bg-black/50 w-full h-full fixed">
        <div class="container flex flex-col bg-white space-y-10 mx-auto my-20 w-4/6 h-2/6 px-7 py-5 rounded-lg">
            <div class="flex space-x-2">
                <span class="text-lg font-semibold">팝업 제목</span>
            </div>
            <div class="container max-w-md max-h-96 overflow-auto">
                <div>컨텐츠 영역</div>
            </div>
            <div class="flex space-x-2">
                <button class="bg-blue-600 w-16 p-2 rounded font-bold text-base text-white"
                    @click="clicnConfirmBtn">확인</button>
                <button class="border border-blue-600 w-16 p-2 rounded font-bold text-base text-blue-600"
                    @click="clickCloseBtn">닫기</button>
            </div>
        </div>

    </div>
</template>


<script setup lang='ts'>
import { ref, computed } from 'vue'

const clickCloseBtn = () => {

}

const clicnConfirmBtn = () => {

}
</script>


<style scoped></style>