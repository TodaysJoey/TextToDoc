<script setup lang='ts'>
//import { ref } from 'vue'
</script>

<template>
    <div class="black-bg">
        <h4>제목</h4>
        <p>페이지 내용</p>
        <button class="close">닫기</button>
    </div>
</template>

<style scoped>
.black-bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
}

.white-bg {
    width: 70%;
    margin: 80px auto;
    background: white;
    border-radius: 5px;
    padding: 20px 0;
}

.close {
    cursor: pointer;
    border: none;
    background: #6667AB;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    padding: 5px 15px;
}

.close:hover {
    color: white;
    font-weight: bold;
    transform: scale(1.1);
    transition: all 0.5s;
}
</style>