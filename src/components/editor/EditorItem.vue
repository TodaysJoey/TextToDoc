<template>
    <div id="editorjs"></div>
</template>

<script setup lang='ts'>
//import { ref } from 'vue'
import EditorJS from '@editorjs/editorjs'
import {type BlockAPI, type BlockMutationEvent, type BlockAddedEvent, type BlockChangedEvent, type BlockMovedEvent, type BlockRemovedEvent} from '@editorjs/editorjs'
import Header from '@editorjs/header'
import RawTool from '@editorjs/raw'
// import List from "@editorjs/list"
import Table from '@editorjs/table'
import Marker from '@editorjs/marker'
import NestedList from '@editorjs/nested-list'
import Underline from '@editorjs/underline'
import Warning from '@editorjs/warning';

const editor = new EditorJS({
    holder: 'editorjs',
    tools: {
        header: {
            class: Header,
            config: {
                levels:[1,2,3,4],
                defaultLevel: 1
            }
        },
        raw: RawTool,
        table: Table,
        Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
        },
        list: {
            class: NestedList,
            inlineToolbar: true,
            config: {
                defaultStyle: 'unordered'
            }
        },
        underline: Underline,
        warning: Warning,
    }
});


</script>

<style scoped>
</style>