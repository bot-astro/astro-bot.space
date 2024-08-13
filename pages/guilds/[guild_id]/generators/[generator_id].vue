<template>
  <div class="flex flex-col gap-8">
    <DashboardSettingsSaveToast
      :open="generator_settings_edited"
      :loading="update_generator_pending"
      @save="update_generator({ guild_id: guild_id!, generator_id: generator_id!, generator_settings: m_generator_settings! })"
      @reset="() => m_generator_settings = useClone(generator_settings)"
    />

    <div class="flex items-center gap-4">
      <Icon :name="IconNames.GENERATOR" class="size-10" />
      <div class="flex flex-col">
        <span v-if="guild_channels" class="dashboard-section-title">
          {{ guild_channels.find(c => c.id == generator_id)?.name ?? "Deleted channel" }}
        </span>
        <Skeleton v-else class="h-10 w-72" />
        <span class="dashboard-section-description">Manage the settings of this temporary voice channel generator!</span>
      </div>
      <div class="flex-grow" />
      <AlertDialog>
        <AlertDialogTrigger>
          <ButtonDestructive
            :loading="delete_generator_loading"
          >
            Delete
          </ButtonDestructive>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete the generator?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be un-done and you wont be able to restore this generator!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go back</AlertDialogCancel>
            <AlertDialogAction
              :destructive="true"
              :loading="delete_generator_loading"
              @click="delete_generator({ guild_id: guild_id!, generator_id: generator_id! })"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>

    <div class="flex flex-col gap-12" v-if="m_generator_settings && guild_channels">
      <div class="groups-wrapper">
        <span class="text-group-name">VOICE CHANNEL NAME</span>
        <div class="groups-container">
          <GroupSetting
            heading="Name"
            description="The default name that temporary voice channels have when created"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  type="text"
                  v-model="m_generator_settings.default_name"
                  class="grow"
                  minlength="2"
                  maxlength="500"
                  required
                >
                <DashboardVariablesButton @variableSelect="(v) => m_generator_settings!.default_name += v" />
              </div>
            </template>
          </GroupSetting>
          <GroupSetting
            heading="Locked name"
            description="The name that temporary voice channels have when locked"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  type="text"
                  v-model="m_generator_settings.default_locked_name"
                  class="grow"
                  minlength="2"
                  maxlength="500"
                >
                <DashboardVariablesButton @variableSelect="(v) => m_generator_settings!.default_locked_name += v" />
              </div>
            </template>
          </GroupSetting>
          <GroupSetting
            heading="Hidden name"
            description="The name that temporary voice channels have when hidden"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  type="text"
                  v-model="m_generator_settings.default_hidden_name"
                  class="grow"
                  minlength="2"
                  maxlength="500"
                >
                <DashboardVariablesButton @variableSelect="(v) => m_generator_settings!.default_hidden_name += v" />
              </div>
            </template>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">VOICE CHANNEL RENAME CONDITIONS</span>
        <div class="groups-container">
          <GroupSetting
            heading="State change"
            description="Whether the voice channel name should be update when the state of the voice channel changes. For example when the user locks or hides the channel"
          >
            <Switch v-model:checked="m_generator_settings.rename_conditions.state_change" />
          </GroupSetting>
          <GroupSetting
            heading="Owner change"
            description="Whether the voice channel name should be update when the owner changes"
          >
            <Switch v-model:checked="m_generator_settings.rename_conditions.owner_change" />
          </GroupSetting>
          <GroupSetting
            heading="Activity change"
            description="Whether the voice channel name should be update when the activity of the owner changes. For example when the owner stops playing a game"
          >
            <Switch v-model:checked="m_generator_settings.rename_conditions.activity_change" />
          </GroupSetting>
          <GroupSetting
            heading="Renaming"
            description="Whether the voice channel name should be updated even if it was manually renamed by the owner. For example, if this setting is off and the owner renames the channel, it wont be updated when any of the above scenarios happen"
          >
            <Switch v-model:checked="m_generator_settings.rename_conditions.renamed" />
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">VOICE CHANNEL SETTINGS</span>
        <div class="groups-container-compact flex-wrap">
          <GroupSetting
            heading="Category"
            description="The category in which temporary voice channels are generated"
            compact
          >
            <template #bottom-action>
              <Select
                v-model:model-value="category"
                @update:modelValue="(category_id) => m_generator_settings!.category = category_id"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="category in guild_channels.filter(c => c.type == 4)"
                      :value="category.id"
                    >
                      {{category.name}}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Position"
            description="The exact position where temporary voice channels are placed inside the category."
            compact
          >
            <template #bottom-action>
              <Select
                v-model:model-value="m_generator_settings.initial_position"
                @update:modelValue="(pos) => m_generator_settings!.initial_position = GSGeneratorInitialPosition[pos as keyof typeof GSGeneratorInitialPosition]"
              >
                <SelectTrigger>
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="pos in Object.values(GSGeneratorInitialPosition)"
                      :value="pos"
                    >
                      {{capitalize(pos)}}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>
        </div>
      </div>
    </div>

    <div v-else-if="guild_settings_error" class="center text-foreground-destructive">
      Something went wrong, please try again later
    </div>
    <div v-else class="center">
      <IconLoading />
    </div>
  </div>
</template>

<script setup lang="ts">
import {toast} from "vue-sonner";
import {IconNames} from "assets/config/IconNames";
import useUpdateGeneratorMutation from "~/data/astro/mutations/useUpdateGeneratorMutation";
import type {GSGenerator} from "~/types/guild-settings/generator";
import {deepEqual} from "fast-equals";
import {Select, SelectItem} from "~/components/ui/select";

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const route = useRoute()
const guild_id = useGuildId()
const generator_id = ref(route.params.generator_id as string | undefined)

watch(() => route.params, (params) => {
  generator_id.value = params.generator_id as string | undefined
})

const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_settings, error: guild_settings_error } = useGuildSettings(guild_id)
const generator_settings = computed(() => {
  return guild_settings.value?.generators?.find(g => g.id == generator_id.value)
})
const m_generator_settings = ref<GSGenerator | undefined>(undefined)
const generator_settings_edited = ref(false)


watch(generator_settings, (new_generator_settings) => {
  if (new_generator_settings) {
    m_generator_settings.value = useClone(new_generator_settings)
  }
}, { deep: true })

watch(m_generator_settings, (new_m_generator_settings) => {
  if (!generator_settings.value || !new_m_generator_settings) {
    generator_settings_edited.value = false
  } else {
    generator_settings_edited.value = !deepEqual(new_m_generator_settings, generator_settings.value)
  }
}, { deep: true })


/// COMPUTED SETTINGS ///
const category = computed(() => {
  return guild_channels.find(c => c.id == m_generator_settings.category)?.name ?? 'None'
})

/// MUTATIONS ///
const { mutate: delete_generator, isPending: delete_generator_loading, error: delete_generator_error, isSuccess: delete_generator_success } = useDeleteGeneratorMutation()
const { mutate: update_generator, isPending: update_generator_pending, error: update_generator_error } = useUpdateGeneratorMutation()

/// SUCCESS ACTIONS ///
watch(delete_generator_success, (s) => {
  if (s) {
    navigateTo(`/guilds/${guild_id.value}/generators`)
  }
})

/// ERROR TOASTS ///
watch(delete_generator_error, (e) => {
  if (e?.message) {
    toast.error(e.message)
  }
})

watch(update_generator_error, (e) => {
  if (e?.message) {
    toast.error(e.message)
  }
})
</script>