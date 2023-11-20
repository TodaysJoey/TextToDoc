<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from "vue-router";

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

</script>

<template>
    <div class="flex justify-between">
        <div>
            <img src="../assets/images/logo.svg" alt="TexToDoc" @click="goIndexPage">
        </div>
        <div>
            <button class="header-primary-btn" v-if="!isLoginStatus" @click="moveLoginPage">Sign In/Up</button>
            <button class="header-primary-btn ml-1.5" v-if="isLoginStatus">로그아웃</button>
        </div>
    </div>
</template>

<style scoped></style>