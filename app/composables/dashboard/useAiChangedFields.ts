import type { Ref } from 'vue'

export const AI_CHANGED_FIELDS_KEY = 'ai_changed_fields'

/**
 * Fields changed by the AI fill of the form, GroupSetting highlights the ones it edits
 */
export default function (): Ref<string[]> {
  const ai_changed_fields = ref<string[]>([])
  provide(AI_CHANGED_FIELDS_KEY, ai_changed_fields)

  return ai_changed_fields
}
