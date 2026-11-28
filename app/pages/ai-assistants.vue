<script setup lang="ts">
const MCP_URL = 'https://mcp.astro-bot.space/mcp'
const SKILLS_REPO_URL = 'https://github.com/bot-astro/astro-mcp'
// filled in once Astro is listed in the official directories, the buttons stay hidden while empty
const CLAUDE_DIRECTORY_URL = ''
const CHATGPT_DIRECTORY_URL = ''

const CURSOR_INSTALL_URL = `cursor://anysphere.cursor-deeplink/mcp/install?name=astro&config=${btoa(JSON.stringify({ url: MCP_URL }))}`
const VSCODE_INSTALL_URL = `vscode:mcp/install?${encodeURIComponent(JSON.stringify({ name: 'astro', type: 'http', url: MCP_URL }))}`
const CLAUDE_CODE_PLUGIN_COMMANDS =
  '/plugin marketplace add bot-astro/astro-mcp\n/plugin install astro@astro-mcp'
const CLAUDE_CODE_MCP_COMMAND = `claude mcp add --transport http astro ${MCP_URL}`

const { t } = useI18n()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.ai_assistants.title') }),
  meta: [
    { name: 'description', content: t('meta.ai_assistants.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: t('meta.ai_assistants.title') }),
    },
    {
      property: 'og:description',
      content: t('meta.ai_assistants.description'),
    },
    { property: 'og:url', content: 'https://astro-bot.space/ai-assistants' },
  ],
}))

const { copy, copied, text: copied_text } = useClipboard()
</script>

<template>
  <div
    class="mx-4 mt-16 flex w-full max-w-3xl flex-col items-center gap-12 md:mx-12"
  >
    <div class="flex flex-col gap-4">
      <span class="text-title text-center">{{
        $t('ai_assistants.title')
      }}</span>
      <span class="text-subtitle text-center">{{
        $t('ai_assistants.subtitle')
      }}</span>
    </div>

    <!-- url -->
    <div class="group-setting flex w-full flex-col gap-2">
      <span class="text-heading">{{ $t('ai_assistants.url_title') }}</span>
      <span class="text-description">{{
        $t('ai_assistants.url_description')
      }}</span>
      <div class="flex items-center gap-2">
        <code class="grow truncate rounded-md bordered p-2">{{ MCP_URL }}</code>
        <Button @click="copy(MCP_URL)">
          {{
            copied && copied_text === MCP_URL
              ? $t('ai_assistants.copied')
              : $t('ai_assistants.copy')
          }}
        </Button>
      </div>
    </div>

    <!-- claude -->
    <div class="group-setting flex w-full flex-col gap-2">
      <span class="text-heading">Claude</span>
      <span class="text-description">{{
        $t('ai_assistants.claude_steps')
      }}</span>
      <Button
        v-if="CLAUDE_DIRECTORY_URL"
        :to="CLAUDE_DIRECTORY_URL"
        target="_blank"
      >
        {{ $t('ai_assistants.open_directory') }}
      </Button>
    </div>

    <!-- chatgpt -->
    <div class="group-setting flex w-full flex-col gap-2">
      <span class="text-heading">ChatGPT</span>
      <span class="text-description">{{
        $t('ai_assistants.chatgpt_steps')
      }}</span>
      <Button
        v-if="CHATGPT_DIRECTORY_URL"
        :to="CHATGPT_DIRECTORY_URL"
        target="_blank"
      >
        {{ $t('ai_assistants.open_directory') }}
      </Button>
    </div>

    <!-- claude code -->
    <div class="group-setting flex w-full flex-col gap-2">
      <span class="text-heading">Claude Code</span>
      <span class="text-description">{{
        $t('ai_assistants.claude_code_plugin')
      }}</span>
      <div class="flex items-center gap-2">
        <pre class="grow overflow-x-auto rounded-md bordered p-2 text-sm">{{
          CLAUDE_CODE_PLUGIN_COMMANDS
        }}</pre>
        <Button @click="copy(CLAUDE_CODE_PLUGIN_COMMANDS)">
          {{
            copied && copied_text === CLAUDE_CODE_PLUGIN_COMMANDS
              ? $t('ai_assistants.copied')
              : $t('ai_assistants.copy')
          }}
        </Button>
      </div>
      <span class="text-description">{{
        $t('ai_assistants.claude_code_mcp')
      }}</span>
      <div class="flex items-center gap-2">
        <pre class="grow overflow-x-auto rounded-md bordered p-2 text-sm">{{
          CLAUDE_CODE_MCP_COMMAND
        }}</pre>
        <Button @click="copy(CLAUDE_CODE_MCP_COMMAND)">
          {{
            copied && copied_text === CLAUDE_CODE_MCP_COMMAND
              ? $t('ai_assistants.copied')
              : $t('ai_assistants.copy')
          }}
        </Button>
      </div>
    </div>

    <!-- editors -->
    <div class="group-setting flex w-full flex-col gap-2">
      <span class="text-heading">Cursor & VS Code</span>
      <span class="text-description">{{
        $t('ai_assistants.editors_description')
      }}</span>
      <div class="flex flex-wrap gap-2">
        <!-- plain link, NuxtLink doesn't recognize custom protocols as external -->
        <a class="button" :href="CURSOR_INSTALL_URL">
          {{ $t('ai_assistants.install_in', { app: 'Cursor' }) }}
        </a>
        <a class="button" :href="VSCODE_INSTALL_URL">
          {{ $t('ai_assistants.install_in', { app: 'VS Code' }) }}
        </a>
      </div>
    </div>

    <!-- other agents -->
    <div class="group-setting flex w-full flex-col gap-2">
      <span class="text-heading">{{ $t('ai_assistants.other_title') }}</span>
      <span class="text-description">{{
        $t('ai_assistants.other_description')
      }}</span>
      <Button :to="SKILLS_REPO_URL" target="_blank">
        {{ $t('ai_assistants.see_skills') }}
      </Button>
    </div>
  </div>
</template>
