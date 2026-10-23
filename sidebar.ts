import type { DefaultTheme } from 'vitepress';
import navigation from './.vitepress/sidebar.json';

// Each route in a section uses the same complete menu, including all overview links.
const sections: Record<string, DefaultTheme.SidebarItem[]> = navigation.sections;
export default Object.fromEntries(
    Object.entries(navigation.routes).map(([prefix, section]) => [prefix, sections[section]])
);
