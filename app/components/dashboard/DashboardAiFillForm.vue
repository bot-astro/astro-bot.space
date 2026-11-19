<template>
  <div
    class="flex flex-col gap-2 rounded-md bordered bg-background-container p-3"
  >
    <div class="flex items-center gap-2">
      <Sparkles class="size-4 text-foreground-link-standout" />
      <span class="font-semibold">{{ $t('ai.form_fill.title') }}</span>
    </div>
    <form
      class="flex gap-2"
      @submit.prevent="
        () => {
          const text = prompt.trim()
          if (!text) return
          fill(
            {
              guild_id: guild_id!,
              form_fill_rb: {
                page: props.page,
                entityId: props.entityId,
                currentValues: props.currentValues,
                prompt: text,
              },
            },
            {
              onSuccess: (result) => {
                message = result.message
                prompt = ''
                emit('fill', result)
              },
            },
          )
        }
      "
    >
      <input
        v-model="prompt"
        type="text"
        class="grow"
        :placeholder="$t('ai.form_fill.placeholder')"
        maxlength="2000"
      />
      <Button :loading="fill_pending" :disabled="!prompt.trim()">
        {{ $t('ai.form_fill.submit') }}
      </Button>
    </form>
    <span v-if="fill_error" class="text-destructive">
      {{ fill_error.message || $t('ai.chat.error') }}
    </span>
    <div v-else-if="message" class="flex flex-col gap-1">
      <span>{{ message }}</span>
      <span class="text-xs text-foreground-secondary">{{
        $t('ai.form_fill.review')
      }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Sparkles } from 'lucide-vue-next'
import type { AIFormFillResult, AIFormPage } from '~/types/ai'
import useAiFormFillMutation from '~/data/astro/mutations/useAiFormFillMutation'

const props = defineProps<{
  page: AIFormPage
  entityId?: string
  currentValues: object
}>()
const emit = defineEmits<{ fill: [result: AIFormFillResult] }>()

const guild_id = useGuildId()
const prompt = ref('')
const message = ref('')

const {
  mutate: fill,
  isPending: fill_pending,
  error: fill_error,
} = useAiFormFillMutation()
</script>
