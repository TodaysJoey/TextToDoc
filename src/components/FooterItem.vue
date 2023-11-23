<script setup lang='ts'>
//import { ref } from 'vue'
</script>

<template>
    <div class="flex justify-between footer-color">
        <div class="my-auto">
            <span class="text-white font-bold text-xs">JIHYUN LEE @ 2023. All rights reserved.</span>
        </div>
        <div class="my-auto">
            <div class="border rounded-full border-white icon-box">
                <img class="icon-img" src="../assets/images/github_icon.svg" alt="GitHub Link" width="21" height="21">
            </div>
        </div>
    </div>
</template>

<style scoped>
.footer-color {
    background-color: #3563E9;
}

.icon-box {
    width: 35px;
    height: 35px;
}

.icon-img {
    display: inline;
    margin-left: 6px;
    margin-top: 5px;
    padding: 1px;
}
</style>