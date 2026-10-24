import type { DefaultTheme } from 'vitepress'
import navigation from './.vitepress/sidebar.json'
import { createSidebar } from './.vitepress/navigation.mjs'

export default createSidebar(navigation) satisfies DefaultTheme.Sidebar
