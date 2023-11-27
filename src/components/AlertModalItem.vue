<script setup lang='ts'>

const props = defineProps({
    isVisible: { type: Boolean, required: true },
    msg: String
})

const emit = defineEmits(['response'])
const clickCloseBtn = () => {
    emit('response', false)
}


</script>

<template>
    <div class="bg-black/50 w-full h-full fixed">
        <div class="container flex flex-col bg-white space-y-10 mx-auto my-20 w-1/3 h-1/3 px-7 py-5 rounded-lg">
            <div class="flex space-x-2">
                <img src="../assets/images/warning_icon.svg" class="">
                <span class="text-red-600 font-bold text-base">제목</span>
            </div>
            <div>
                <p>{{ props.msg }}</p>
            </div>
            <div class="">
                <button @click="clickCloseBtn">확인</button>
                <button class="close" @click="clickCloseBtn">닫기</button>
            </div>
        </div>

    </div>
</template>

<style scoped>
.dim {}

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