<script setup lang='ts'>
import { ref, watch } from 'vue'
import { useRouter } from "vue-router"
import { useUserInfoStore } from '@/stores/user';

const userStore = useUserInfoStore()

const router = useRouter();
const isLoginStatus = ref(false)


const moveLoginPage = () => {
    router.push({
        path: '/login',
    });
}
const goIndexPage = () => {
    router.push({
        path: '/',
    });
}

watch(() => userStore.getLoginStatus, (cur, pre) => {
    isLoginStatus.value = cur
})


</script>

<template>
    <div class="flex justify-between">
        <div>
            <img class="cursor-pointer" src="../assets/images/logo.svg" alt="TexToDoc" @click="goIndexPage">
        </div>
        <div>
            <button class="header-primary-btn" v-if="!isLoginStatus" @click="moveLoginPage">Sign Up/In</button>
            <button class="header-primary-btn ml-1.5" v-if="isLoginStatus">로그아웃</button>
        </div>
    </div>
</template>

<style scoped></style>