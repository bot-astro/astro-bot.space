<template>
  <Popover>
    <PopoverTrigger>
      <ButtonSecondary>
        <Icon :name="IconNames.VARIABLES" class="size-6" />
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
        <span class="text-foreground-secondary">{{category}}</span>
        <div class="flex flex-wrap gap-2 text-xs">
          <ButtonSecondary
            v-for="variable in variables.filter(v => v.category === category)"
            @click="$emit('variableSelect', `{${variable.name}}`)"
          >
            {{`\{${variable.name}\}`}}
          </ButtonSecondary>
        </div>
      </div>

    </PopoverContent>
  </Popover>
</template>
<script setup lang="ts">
import {IconNames} from "assets/config/IconNames";

const emit = defineEmits<{
  variableSelect: [string],
}>()

enum VariableCategory {
  VOICE_CHANNEL_OWNER = "Voice channel owner",
  VOICE_CHANNEL_OWNER_ACTIVITY = "Voice channel owner activity",
  VOICE_CHANNEL_PROPERTIES = "Voice channel properties",
  INCREMENTAL_VALUES = "Incremental values"
}

interface VariableInfo {
  name: string;
  category: VariableCategory;
}


const variables: VariableInfo[] = [
  { name: "nickname", category: VariableCategory.VOICE_CHANNEL_OWNER },
  { name: "username", category: VariableCategory.VOICE_CHANNEL_OWNER },
  { name: "mention", category: VariableCategory.VOICE_CHANNEL_OWNER },
  { name: "id", category: VariableCategory.VOICE_CHANNEL_OWNER },

  { name: "activity_name", category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY },
  { name: "activity_emoji", category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY },
  { name: "activity_start_time", category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY },
  { name: "activity_end_time", category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY },
  { name: "activity_type", category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY },
  { name: "activity_link", category: VariableCategory.VOICE_CHANNEL_OWNER_ACTIVITY },

  { name: "vc_name", category: VariableCategory.VOICE_CHANNEL_PROPERTIES },
  { name: "vc_bitrate", category: VariableCategory.VOICE_CHANNEL_PROPERTIES },
  { name: "vc_userlimit", category: VariableCategory.VOICE_CHANNEL_PROPERTIES },
  { name: "vc_users", category: VariableCategory.VOICE_CHANNEL_PROPERTIES },
  { name: "vc_id", category: VariableCategory.VOICE_CHANNEL_PROPERTIES },
  { name: "vc_mention", category: VariableCategory.VOICE_CHANNEL_PROPERTIES },

  { name: "n", category: VariableCategory.INCREMENTAL_VALUES },
  { name: "roman", category: VariableCategory.INCREMENTAL_VALUES },
  { name: "nato", category: VariableCategory.INCREMENTAL_VALUES },
]
</script>