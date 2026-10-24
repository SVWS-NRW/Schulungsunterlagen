<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'
import navigation from '../../sidebar.json'
import { sectionFor, sidebarFor } from '../../navigation.mjs'
import SchoolSidebarItem from './SchoolSidebarItem.vue'
const { page } = useData()
const target = computed(() => '/' + page.value.relativePath)
const visible = computed(() => sectionFor(navigation, target.value) === 'schulungen')
const groups = computed(() => visible.value ? sidebarFor(navigation, target.value) : [])
const opened = ref(0)
watch(target, () => { opened.value = groups.value.findIndex(group => group.collapsed === false) }, { immediate: true })
</script>

<template>
  <div v-if="visible" class="school-sidebar" aria-label="Schulungen und Schulungsumgebungen">
    <section v-for="(group, index) in groups" :key="group.text" class="school-section">
      <h2>
        <button :id="'school-section-heading-' + index" type="button" :aria-expanded="opened === index" :aria-controls="'school-section-panel-' + index" @click="opened = opened === index ? -1 : index">
          {{ group.text }} <span aria-hidden="true">{{ opened === index ? '⌄' : '›' }}</span>
        </button>
      </h2>
      <ul v-show="opened === index" :id="'school-section-panel-' + index" :aria-labelledby="'school-section-heading-' + index">
        <SchoolSidebarItem v-for="item in group.items" :key="item.link ?? item.text" :item="item" :target="target" />
      </ul>
    </section>
  </div>
</template>

<style>
/* The custom school accordion uses the standard sidebar slot and mobile drawer. */
.school-sidebar ~ .group { display: none; }
.school-sidebar { font-size: 14px; line-height: 1.6; }
.school-section { padding: 12px 0; border-top: 1px solid var(--vp-c-divider); }
.school-section:first-child { border-top: 0; }
.school-section h2 { margin: 0; font-size: 14px; font-weight: 700; }
.school-section h2 > button { display: flex; width: 100%; align-items: center; justify-content: space-between; padding: 6px 0; text-align: left; }
.school-sidebar ul { list-style: none; padding: 0; margin: 0; }
.school-topic-row { display: flex; align-items: start; gap: 8px; }
.school-topic-row a, .school-topic-row > span { flex: 1; min-width: 0; padding: 5px 0; color: var(--vp-c-text-2); overflow-wrap: anywhere; }
.school-topic-row > button { flex: 0 0 28px; padding: 5px 0; }
.school-topic.has-children > .school-topic-row > a { font-weight: 600; }
.school-topic > ul { margin-left: 4px; padding-left: 12px; border-left: 1px solid var(--vp-c-divider); }
.school-topic-row a:hover, .school-topic-row a[aria-current="page"] { color: var(--vp-c-brand-1); }
.school-sidebar button:focus-visible, .school-sidebar a:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }
</style>
