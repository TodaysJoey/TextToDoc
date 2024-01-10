<template>
    <div id="editorjs"></div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import RawTool from '@editorjs/raw'
// import List from "@editorjs/list"
import Table from '@editorjs/table'
import Marker from '@editorjs/marker'
import NestedList from '@editorjs/nested-list'
import Underline from '@editorjs/underline'
import Warning from '@editorjs/warning';


const docStr = ref('')
const emit = defineEmits(['change'])

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
    },
    onChange: async (api, event) => {
        // TODO event 에서 block-added type 인 경우 데이터 처리
        console.log('Now I know that Editor\'s content changed!', event)
        // if(event.type == 'block-added') {
            const contents = await api.saver.save()
            console.log(contents)

            docStr.value = ''

            for (let block of contents.blocks) {
                if (block.type == 'paragraph') {
                    docStr.value += `<p>${block.data.text}</p>`
                } else if (block.type == 'list') {
                    docStr.value += `<ul>`
                    docStr.value += getBulletItem(block.data.items)
                    docStr.value += `</ul>`
                } else if(block.type == 'header') {
                    switch(block.data.level) {
                        case 1:
                            docStr.value += `<h1>${block.data.text}</h1>`
                            break
                        case 2:
                            docStr.value += `<h2>${block.data.text}</h2>`
                            break
                        case 3:
                            docStr.value += `<h3>${block.data.text}</h3>`
                            break
                        case 4:
                            docStr.value += `<h4>${block.data.text}</h4>`
                            break
                    }
                    
                }
            }

            emit('change', docStr.value)
        // }
        

    }
});

const getBulletItem = (list, called = 0) => {
    const listString = new Array()

    for(let i=0; i<list.length; i++) {
        listString.push(`<li>${list[i].content}</li>`)
        if(list[i].items.length > 0){
            listString.push(`<ul style='padding-left: 10px;'>`)
            listString.push(getBulletItem(list[i].items, called+1))
            listString.push(`</ul>`)
        }
    }

    return listString.join('')
}


</script>

<style scoped>
</style>