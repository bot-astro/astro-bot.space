<template>
  <div>
    <button
      v-show="!open"
      class="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-background-button px-4 py-2 text-foreground shadow-lg transition hover:opacity-80"
      :aria-label="$t('ai.chat.open')"
      @click="open = true"
    >
      <Sparkles class="size-5" />
      {{ $t('ai.chat.title') }}
    </button>

    <div
      v-show="open"
      class="fixed inset-y-0 right-0 z-50 flex w-full flex-col bordered bg-background shadow-xl sm:w-105"
    >
      <div class="flex items-center gap-2 border-b border-border p-4">
        <Sparkles class="size-5 text-foreground-link-standout" />
        <span class="grow text-base font-semibold">{{
          $t('ai.chat.title')
        }}</span>
        <button
          :aria-label="$t('ai.chat.close')"
          class="text-foreground-link hover:text-foreground-link-hover"
          @click="open = false"
        >
          <X class="size-5" />
        </button>
      </div>

      <div
        ref="scroll_container"
        class="flex grow flex-col gap-3 overflow-y-auto p-4"
      >
        <span v-if="messages.length === 0" class="text-foreground-secondary">
          {{ $t('ai.chat.empty') }}
        </span>

        <template v-for="message in messages" :key="message.id">
          <template v-for="(part, i) in message.parts" :key="i">
            <div
              v-if="part.type === 'text' && part.text"
              :class="
                cn(
                  'max-w-[90%] rounded-md px-3 py-2 wrap-break-word whitespace-pre-wrap',
                  message.role === 'user'
                    ? 'self-end bg-background-button/80'
                    : 'self-start bg-background-container',
                )
              "
            >
              {{ part.text }}
            </div>
            <DashboardAiProposalCard
              v-else-if="part.type === 'data-proposal'"
              :guild-id="guild_id!"
              :proposal="part.data"
            />
          </template>
        </template>

        <span v-if="status === 'submitted'" class="text-foreground-secondary">
          {{ $t('ai.chat.thinking') }}
        </span>
        <span v-if="error" class="text-destructive">
          {{ error.message || $t('ai.chat.error') }}
        </span>
      </div>

      <div class="flex flex-col gap-2 border-t border-border p-4">
        <form
          class="flex gap-2"
          @submit.prevent="
            () => {
              const text = input.trim()
              if (!text || busy) return
              sendMessage({ text })
              input = ''
            }
          "
        >
          <input
            v-model="input"
            type="text"
            class="grow"
            :placeholder="$t('ai.chat.placeholder')"
            maxlength="2000"
          />
          <Button :loading="busy" :disabled="!input.trim()">
            {{ $t('ai.chat.send') }}
          </Button>
        </form>
        <span v-if="usage" class="text-xs text-foreground-secondary">
          {{
            $t('ai.chat.usage', {
              used: usage.messagesUsed,
              limit: usage.messagesLimit,
            })
          }}
          ·
          {{
            $t('ai.chat.usage_resets', {
              date: new Date(usage.resetsAt).toLocaleDateString(),
            })
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useChat } from '@ai-sdk/vue'
import { DefaultChatTransport } from 'ai'
import { Sparkles, X } from 'lucide-vue-next'
import cn from '~/utils/cn'
import type { AIMessage } from '~/types/ai'
import { guild_ai_usage_qk } from '~/data/astro/config/query-keys'

const { $astroApiClient } = useNuxtApp()
const queryClient = useQueryClient()
const guild_id = useGuildId()
const { data: usage } = useAiUsage(guild_id)

const open = ref(false)
const input = ref('')
const scroll_container = ref<HTMLElement>()

// a new guild gets a fresh chat, the history of each guild lives on the server
const { messages, sendMessage, status, error } = useChat<AIMessage>(() => ({
  id: guild_id.value,
  transport: new DefaultChatTransport({
    api: $astroApiClient.ai_chat_url(guild_id.value!),
    credentials: 'include',
    fetch: $astroApiClient.ai_chat_fetch,
  }),
}))

const busy = computed(
  () => status.value === 'submitted' || status.value === 'streaming',
)

watch(status, (new_status) => {
  if (new_status === 'ready' || new_status === 'error') {
    queryClient.invalidateQueries({
      queryKey: guild_ai_usage_qk(guild_id.value!),
    })
  }
})

watch(
  [messages, open],
  () =>
    nextTick(() =>
      scroll_container.value?.scrollTo({
        top: scroll_container.value.scrollHeight,
      }),
    ),
  { deep: true },
)
</script>
