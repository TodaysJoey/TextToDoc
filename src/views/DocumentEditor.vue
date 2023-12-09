<template>
    <div class="flex flex-nowrap bg-slate-200 editor-content">
        <AccordionItem />
        <div class="basis-5/6 flex flex-col">
            <div class="flex bg-white m-5">
                <div class="basis-80 space-x-4 p-4">
                    <img class="inline" :src="profileTmpImage" />
                    <span>JaneDoe@abcd.ef</span>
                </div>
                <div class="flex ml-auto space-x-6 p-4">
                    <button class="primary-text"><img class="inline mr-2" :src="saveIcon" />저장하기</button>
                    <button class="primary-text"><img class="inline mr-2" :src="exportIcon" />문서 추출하기</button>
                </div>

            </div>
            <div class="editor flex flex-nowrap">
                <div class="bg-white basis-1/2 h-screen ml-5 mr-2"></div>
                <div class="bg-white basis-1/2 h-screen mr-5 ml-2"></div>
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>
// import { ref } from 'vue'
import AccordionItem from '@/components/AccordionItem.vue'
import saveIcon from '@/assets/images/save_icon.svg'
import exportIcon from '@/assets/images/export_icon.svg'
import profileTmpImage from '@/assets/images/user_thumb.svg'


</script>

<style scoped>
.editor-content {
    padding-bottom: 0 !important
}
</style>