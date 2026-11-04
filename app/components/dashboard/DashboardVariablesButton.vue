<template>
  <Popover>
    <PopoverTrigger>
      <ButtonSecondary>
        <IconVariable class="size-6" />
      </ButtonSecondary>
    </PopoverTrigger>
    <PopoverContent
      class="flex max-w-xs flex-col gap-4 border-border sm:max-w-sm md:max-w-lg"
    >
      <div class="flex">
        <span class="text-lg">Variables</span>
        <div class="grow" />
        <ButtonText
          @click="
            navigateTo('/guides/generator', { open: { target: '_blank' } })
          "
        >
          <IconQuestion class="size-6" />
        </ButtonText>
      </div>

      <div
        v-for="category in Object.values(VariableCategory)"
        :key="category"
        class="flex flex-col gap-1"
      >
        <div class="vertical-center gap-2">
          <span class="text-foreground-secondary">{{ category }}</span>
          <Badge
            v-if="
              (category == VariableCategory.INCREMENTAL_VALUES ||
                category == VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY) &&
              !isUltimate
            "
            variant="ultimate"
            class="text-xs"
            >Ultimate</Badge
          >
        </div>
        <div class="flex flex-wrap gap-2 text-xs">
          <ButtonSecondary
            v-for="variable in variables.filter((v) => v.category === category)"
            :key="variable.name"
            :disabled="disabledCategories.includes(category)"
            :class="
              cn(
                variable.ultimate && !props.isUltimate ? 'cursor-copy' : '',
                'relative disabled:opacity-50',
              )
            "
            @click="
              variable.ultimate && !props.isUltimate
                ? $emit('upgrade')
                : $emit('variableSelect', `{${variable.name}}`)
            "
          >
            {{ `\{${variable.name}\}` }}
            <DashboardUltimateOverlay v-if="variable.ultimate && !isUltimate" />
          </ButtonSecondary>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isUltimate: boolean
    disabledCategories?: VariableCategory[]
  }>(),
  { disabledCategories: () => [] },
)
defineEmits<{ variableSelect: [string]; upgrade: [] }>()

interface VariableInfo {
  name: string
  category: VariableCategory
  ultimate: boolean
}

const variables: VariableInfo[] = [
  {
    name: 'nickname',
    category: VariableCategory.VOICE_CHANNEL_OWNER,
    ultimate: false,
  },
  {
    name: 'username',
    category: VariableCategory.VOICE_CHANNEL_OWNER,
    ultimate: false,
  },
  {
    name: 'mention',
    category: VariableCategory.VOICE_CHANNEL_OWNER,
    ultimate: false,
  },
  {
    name: 'id',
    category: VariableCategory.VOICE_CHANNEL_OWNER,
    ultimate: false,
  },

  {
    name: 'activity_name',
    category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY,
    ultimate: true,
  },
  {
    name: 'activity_emoji',
    category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY,
    ultimate: true,
  },
  {
    name: 'activity_start_time',
    category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY,
    ultimate: true,
  },
  {
    name: 'activity_end_time',
    category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY,
    ultimate: true,
  },
  {
    name: 'activity_type',
    category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY,
    ultimate: true,
  },
  {
    name: 'activity_link',
    category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY,
    ultimate: true,
  },

  {
    name: 'vc_name',
    category: VariableCategory.VOICE_CHANNEL_PROPERTIES,
    ultimate: false,
  },
  {
    name: 'vc_bitrate',
    category: VariableCategory.VOICE_CHANNEL_PROPERTIES,
    ultimate: false,
  },
  {
    name: 'vc_userlimit',
    category: VariableCategory.VOICE_CHANNEL_PROPERTIES,
    ultimate: false,
  },
  {
    name: 'vc_users',
    category: VariableCategory.VOICE_CHANNEL_PROPERTIES,
    ultimate: false,
  },
  {
    name: 'vc_id',
    category: VariableCategory.VOICE_CHANNEL_PROPERTIES,
    ultimate: false,
  },
  {
    name: 'vc_mention',
    category: VariableCategory.VOICE_CHANNEL_PROPERTIES,
    ultimate: false,
  },

  { name: 'n', category: VariableCategory.INCREMENTAL_VALUES, ultimate: true },
  {
    name: 'roman',
    category: VariableCategory.INCREMENTAL_VALUES,
    ultimate: true,
  },
  {
    name: 'nato',
    category: VariableCategory.INCREMENTAL_VALUES,
    ultimate: true,
  },
]
</script>
