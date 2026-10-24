import taskLists from 'markdown-it-task-lists'
import { configureHintBoxes } from './hint-boxes.ts'

export function configureMarkdown(md: any) {
  md.use(taskLists, { label: true })
  configureHintBoxes(md)
  // Preserve the core linkifier while preventing nested links inside HTML anchors.
  // VitePress's emoji rule stays enabled for existing training shortcuts.
  md.inline.ruler.disable('linkify')
}
