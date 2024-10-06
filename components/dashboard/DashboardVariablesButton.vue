<template>
  <Popover>
    <PopoverTrigger>
      <ButtonSecondary>
        <IconVariable class="size-6" />
      </ButtonSecondary>
    </PopoverTrigger>
    <PopoverContent class="flex flex-col gap-4 max-w-xs sm:max-w-sm md:max-w-lg border-border">
      <div class="flex">
        <span class="text-lg">Variables</span>
        <div class="grow" />
        <ButtonText @click="navigateTo('/guides/generator', { open: { target: '_blank' } })">
          <IconQuestion class="size-6" />
        </ButtonText>
      </div>

      <div v-for="category in Object.values(VariableCategory)" :key="category" class="flex flex-col gap-1">
        <div class="vertical-center gap-2">
          <span class="text-foreground-secondary">{{category}}</span>
          <Badge v-if="category == VariableCategory.INCREMENTAL_VALUES && !is_ultimate" variant="ultimate" class="text-xs">Ultimate</Badge>
        </div>
        <div class="flex flex-wrap gap-2 text-xs">
          <ButtonSecondary
            v-for="variable in variables.filter(v => v.category === category)"
            @click="variable.ultimate && !props.is_ultimate ? $emit('upgrade') : $emit('variableSelect', `{${variable.name}}`)"
            :class="cn(variable.ultimate && !props.is_ultimate ? 'cursor-copy' : '', 'relative')"
          >
            {{`\{${variable.name}\}`}}
            <DashboardUltimateOverlay v-if="variable.ultimate && !is_ultimate" />
          </ButtonSecondary>
        </div>
      </div>

    </PopoverContent>
  </Popover>
</template>
<script setup lang="ts">
import {IconNames} from "assets/config/IconNames";

const props = defineProps<{ is_ultimate: boolean }>()
defineEmits<{ variableSelect: [string], upgrade: [] }>()

enum VariableCategory {
  VOICE_CHANNEL_OWNER = "Voice channel owner",
  VOICE_CHANNEL_OWNER_ACTIVITY = "Voice channel owner activity",
  VOICE_CHANNEL_PROPERTIES = "Voice channel properties",
  INCREMENTAL_VALUES = "Incremental values"
}

interface VariableInfo {
  name: string;
  category: VariableCategory;
  ultimate: boolean;
}


const variables: VariableInfo[] = [
  { name: "nickname", category: VariableCategory.VOICE_CHANNEL_OWNER, ultimate: false },
  { name: "username", category: VariableCategory.VOICE_CHANNEL_OWNER, ultimate: false },
  { name: "mention", category: VariableCategory.VOICE_CHANNEL_OWNER, ultimate: false },
  { name: "id", category: VariableCategory.VOICE_CHANNEL_OWNER, ultimate: false },

  { name: "activity_name", category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY, ultimate: true },
  { name: "activity_emoji", category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY, ultimate: true },
  { name: "activity_start_time", category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY, ultimate: true },
  { name: "activity_end_time", category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY, ultimate: true },
  { name: "activity_type", category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY, ultimate: true },
  { name: "activity_link", category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY, ultimate: true },

  { name: "vc_name", category: VariableCategory.VOICE_CHANNEL_PROPERTIES, ultimate: false },
  { name: "vc_bitrate", category: VariableCategory.VOICE_CHANNEL_PROPERTIES, ultimate: false },
  { name: "vc_userlimit", category: VariableCategory.VOICE_CHANNEL_PROPERTIES, ultimate: false },
  { name: "vc_users", category: VariableCategory.VOICE_CHANNEL_PROPERTIES, ultimate: false },
  { name: "vc_id", category: VariableCategory.VOICE_CHANNEL_PROPERTIES, ultimate: false },
  { name: "vc_mention", category: VariableCategory.VOICE_CHANNEL_PROPERTIES, ultimate: false },

  { name: "n", category: VariableCategory.INCREMENTAL_VALUES, ultimate: true },
  { name: "roman", category: VariableCategory.INCREMENTAL_VALUES, ultimate: true },
  { name: "nato", category: VariableCategory.INCREMENTAL_VALUES, ultimate: true },
]
</script>