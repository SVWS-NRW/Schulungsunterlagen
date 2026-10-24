<script setup lang="ts">
import { ref, watch } from 'vue'
import { withBase } from 'vitepress'
type Item = { text: string; link?: string; collapsed?: boolean; items?: Item[] }
const props = defineProps<{ item: Item; target: string }>()
const expanded = ref(props.item.collapsed === false)
const clean = (url: string) => decodeURIComponent(url.split(/[?#]/, 1)[0]).replace(/(?:\/index)?\.(?:md|html)$/, '').replace(/\/$/, '') || '/'
watch(() => [props.target, props.item.collapsed], () => { expanded.value = props.item.collapsed === false })
</script>

<template>
  <li class="school-topic" :class="{ 'has-children': item.items?.length }">
    <div class="school-topic-row">
      <a v-if="item.link" :href="withBase(item.link)" :aria-current="clean(item.link) === clean(target) ? 'page' : undefined">{{ item.text }}</a>
      <span v-else>{{ item.text }}</span>
      <button v-if="item.items?.length" type="button" :aria-label="item.text + (expanded ? ' zuklappen' : ' aufklappen')" :aria-expanded="expanded" @click="expanded = !expanded">
        <span aria-hidden="true">{{ expanded ? '⌄' : '›' }}</span>
      </button>
    </div>
    <ul v-if="item.items?.length" v-show="expanded">
      <SchoolSidebarItem v-for="child in item.items" :key="child.link ?? child.text" :item="child" :target="target" />
    </ul>
  </li>
</template>
