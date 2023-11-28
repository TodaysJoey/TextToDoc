<script setup lang='ts'>
import { ref, computed } from 'vue'
import info_icon from '../assets/images/info_icon.svg'
import warning_icon from '../assets/images/warning_icon.svg'
import confirm_icon from '../assets/images/confirm_icon.svg'

const props = defineProps({
    isVisible: { type: Boolean, required: true },
    msg: String,
    msgType: String
})

const emit = defineEmits(['response'])
const clickCloseBtn = () => {
    emit('response', false)
}

const alertType = ref(props.msgType)

const titleIconSrc = computed(() => {
    if (alertType.value === 'warning') return warning_icon
    else if (alertType.value === 'confirm') return confirm_icon
    else return info_icon
})

const textColorMode = computed(() => {
    if (alertType.value === 'warning') return 'text-red-600 font-bold text-base'
    else if (alertType.value === 'confirm') return 'text-green-600 font-bold text-base'
    else return 'text-blue-600 font-bold text-base'
})

const okBtnColorMode = computed(() => {
    if (alertType.value === 'warning') return 'bg-red-600 w-16 p-2 rounded font-bold text-base text-white'
    else if (alertType.value === 'confirm') return 'bg-green-600 w-16 p-2 rounded font-bold text-base text-white'
    else return 'bg-blue-600 w-16 p-2 rounded font-bold text-base text-white'
})

const cancelBtnColorMode = computed(() => {
    if (alertType.value === 'warning') return 'border border-red-600 w-16 p-2 rounded font-bold text-base text-red-600'
    else if (alertType.value === 'confirm') return 'border border-green-600 w-16 p-2 rounded font-bold text-base text-green-600'
    else return 'border border-blue-600 w-16 p-2 rounded font-bold text-base text-blue-600'
})


</script>

<template>
    <div class="bg-black/50 w-full h-full fixed">
        <div class="container flex flex-col bg-white space-y-10 mx-auto my-20 w-1/3 h-1/3 px-7 py-5 rounded-lg">
            <div class="flex space-x-2">
                <img :src="titleIconSrc" class="">
                <span :class="textColorMode">{{ props.msgType }}</span>
            </div>
            <div>
                <p>{{ props.msg }}</p>
            </div>
            <div class="flex space-x-2">
                <button :class="okBtnColorMode" @click="clickCloseBtn">확인</button>
                <button :class="cancelBtnColorMode" @click="clickCloseBtn">닫기</button>
            </div>
        </div>

    </div>
</template>

<style scoped></style>