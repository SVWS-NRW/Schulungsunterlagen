<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import navigation from '../../sidebar.json'
import { overviewRows } from '../../overview.mjs'

const props = defineProps({ path: { type: String, required: true }, label: { type: String, required: true } })
const rows = computed(() => overviewRows(navigation, props.path))
</script>

<template>
  <table class="navigation-overview">
    <thead><tr><th scope="col">{{ label }}</th><th scope="col">Kurzüberblick</th></tr></thead>
    <tbody>
      <tr v-for="row in rows" :key="row.link">
        <td><a :href="withBase(row.link)">{{ row.text }}</a></td>
        <td>{{ row.description }}</td>
      </tr>
    </tbody>
  </table>
</template>
