<template>
    <div class="convert-container" v-html="contentStr"></div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'

// const htmlStr = ref('')
const props = defineProps({
    str: {type: String, required: false}
})

const contentStr = computed(()=>props.str)
</script>

<style scoped>
.convert-container {
    padding: 1rem;
}
</style>