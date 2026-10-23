<script setup lang="ts">
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';

type SectionCard = { title: string; details: string; link: string };
const { frontmatter } = useData();
const cards = computed(() => (frontmatter.value.sectionCards ?? []) as SectionCard[]);
</script>

<template>
  <nav class="section-cards" aria-label="Themen in diesem Bereich">
    <a v-for="card in cards" :key="card.link" class="section-card" :href="withBase(card.link)">
      <span class="section-card-title">{{ card.title }}</span>
      <span class="section-card-details">{{ card.details }}</span>
      <span class="section-card-action">Zum Thema <span aria-hidden="true">→</span></span>
    </a>
  </nav>
</template>

<style scoped>
.section-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 190px), 1fr));
  gap: 16px;
  margin: 28px 0 36px;
}
.section-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: border-color .15s, background-color .15s;
}
.section-card:hover { border-color: var(--vp-c-brand-1); }
.section-card:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.section-card-title { font-size: 17px; font-weight: 600; line-height: 1.45; }
.section-card-details { font-size: 14px; line-height: 1.6; color: var(--vp-c-text-2); }
.section-card-action { margin-top: auto; padding-top: 4px; color: var(--vp-c-brand-1); font-size: 14px; }
@media (max-width: 639px) { .section-cards { grid-template-columns: 1fr; } }
@media print { .section-cards { display: block; } .section-card { break-inside: avoid; margin-bottom: 12px; } }
</style>
