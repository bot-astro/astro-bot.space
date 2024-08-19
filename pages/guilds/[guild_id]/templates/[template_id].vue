<template>
  <div class="flex flex-col gap-8 mb-64">
    <DashboardSettingsSaveToast
      :open="template_settings_edited"
      :loading="update_template_pending"
      @save="update_template({ guild_id: guild_id!, template_id: template_id!, template_settings: m_template_settings! })"
      @reset="m_template_settings = useClone(template_settings)"
    />

    <div class="flex items-center gap-4">
      <IconTemplate class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span v-if="template_settings" class="dashboard-section-title">
          {{ template_settings.name }}
        </span>
        <Skeleton v-else class="h-10 w-72" />
        <span class="dashboard-section-description">Manage the settings of this template!</span>
      </div>
      <div class="flex-grow" />
      <AlertDialog>
        <AlertDialogTrigger>
          <ButtonDestructive
            :loading="delete_template_loading"
          >
            Delete
          </ButtonDestructive>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete the template?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be un-done and you wont be able to restore this template!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go back</AlertDialogCancel>
            <AlertDialogAction
              :destructive="true"
              :loading="delete_template_loading"
              @click="delete_template({ guild_id: guild_id!, template_id: template_id! })"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>

    <div class="flex flex-col gap-12" v-if="m_template_settings && guild_channels">
      <div class="groups-wrapper">
        <span class="text-group-name">USAGE SETTINGS</span>
        <div class="groups-container">
          <GroupSetting
            heading="Name"
            description="The name that users see when they are choosing a template to apply to their temporary voice channel (this is not the name of the voice channel itself)"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  placeholder="Insert a name"
                  type="text"
                  v-model="m_template_settings.name"
                  class="grow"
                  minlength="1"
                  required
                >
              </div>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Enabled generators"
            description="Make this template usable only in temporary voice channels created by certain generators"
          >
            <DropdownMenu>
              <DropdownMenuTrigger
                class="bg-background rounded bordered min-h-9 py-1 px-2.5 focus-visible:border-pink-500 focus-visible:border-opacity-80"
              >
                {{m_template_settings.enabled_generator_ids == null ? 'Any generator' : m_template_settings.enabled_generator_ids.length == 0 ? 'Disabled for every generator' : `Allowed in ${m_template_settings.enabled_generator_ids.length} generators`}}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem
                  v-bind:checked="m_template_settings.enabled_generator_ids == null"
                  @update:checked="m_template_settings.enabled_generator_ids == null ? m_template_settings.enabled_generator_ids = [] : m_template_settings.enabled_generator_ids = null"
                >
                  Any generator
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem
                  v-for="generator in guild_settings!.generators"
                  :key="generator.id"
                  v-bind:checked="m_template_settings.enabled_generator_ids != null && m_template_settings.enabled_generator_ids.some(g => g == generator.id)"
                  @update:checked="() => {
                            const was_checked = m_template_settings.enabled_generator_ids != null && m_template_settings.enabled_generator_ids.some(g => g == generator.id)

                            if (was_checked) {
                              m_template_settings.enabled_generator_ids = m_template_settings.enabled_generator_ids!.filter(g => g != generator.id)
                            } else {
                              if (m_template_settings.enabled_generator_ids == null) {
                                m_template_settings.enabled_generator_ids = []
                              }

                              m_template_settings.enabled_generator_ids.push(generator.id)
                            }
                          }"
                >
                  {{guild_channels!.find(c => c.id == generator.id)?.name ?? 'Deleted channel'}}
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">VOICE CHANNEL SETTINGS</span>
        <div class="groups-container">
          <GroupSetting
            heading="Name"
            description="The name applied to temporary voice channels"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  placeholder="Not set"
                  type="text"
                  v-bind:value="m_template_settings.vc_name != null ? m_template_settings.vc_name : undefined"
                  @input="$event.target.value ? (m_template_settings.vc_name = $event.target.value) : (m_template_settings.vc_name = null)"
                  class="grow"
                  minlength="2"
                  maxlength="500"
                >
                <DashboardVariablesButton @upgrade="upgrade_dialog_open = true" @variableSelect="(v) => m_template_settings!.vc_name != null ? (m_template_settings!.vc_name += v) : (m_template_settings!.vc_name = v)" :is_ultimate="is_ultimate" />
              </div>
            </template>
          </GroupSetting>

          <div class="groups-container-compact">
            <GroupSetting
              heading="User limit"
              description="The user limit applied to the temporary voice channel"
              compact
            >
              <template #bottom-action>
                <input
                  placeholder="Not set"
                  v-bind:value="m_template_settings.vc_limit != null ? m_template_settings.vc_limit : undefined"
                  @input="$event.target.value ? (m_template_settings.vc_limit = $event.target.value) : (m_template_settings.vc_limit = null)"
                  type="number"
                  min="0"
                  max="99"
                >
              </template>
            </GroupSetting>

            <GroupSetting
              heading="Bitrate"
              description="The bitrate in kbps that gets applied to the temporary voice channel"
              compact
            >
              <template #bottom-action>
                <div class="relative vertical-center">
                  <input
                    placeholder="Not set"
                    v-bind:value="m_template_settings.vc_bitrate != null ? m_template_settings.vc_bitrate / 1000 : undefined"
                    @input="$event.target.value ? (m_template_settings.vc_bitrate = $event.target.value * 1000) : (m_template_settings.vc_bitrate = null)"
                    type="number"
                    min="8"
                    max="384"
                    class="grow"
                  >
                  <span :class="cn('absolute text-foreground-secondary transition-all duration-100', m_template_settings.vc_bitrate == null ? 'hidden' : m_template_settings.vc_bitrate >= 100000 ? 'left-10' : m_template_settings.vc_bitrate >= 10000 ? 'left-8' : 'left-6')">kbps</span>
                </div>
              </template>
            </GroupSetting>

            <GroupSetting
              heading="Region"
              description="The voice region applied to temporary voice channels"
              compact
            >
              <template #bottom-action>
                <Select
                  v-model:model-value="vc_region_model"
                  @update:model-value="(key) => m_template_settings!.vc_region = key !== 'no_region' ? key : null"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Not set" aria-label="value">{{discord_regions.find(r => r.key == m_template_settings!.vc_region)?.name}}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="region in discord_regions"
                        :key="region.key"
                        :value="region.key"
                      >
                        {{region.emoji}} {{ region.name }}
                      </SelectItem>

                      <SelectItem value="no_region">Not set</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </template>
            </GroupSetting>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="guild_settings_error" class="center text-foreground-destructive">
      Something went wrong, please try again later
    </div>
    <div v-else class="center">
      <IconLoading />
    </div>

    <DashboardUpgradeDialog
      v-model:open="upgrade_dialog_open"
      @onUpgrade="(sub_id) => { upgrade_dialog_open = false; upgrade_guild({ guild_id: guild_id!, subscription_id: sub_id }) }"
      @onPurchaseOnWebsite="() => navigateTo('/ultimate', { external: true, open: { target: '_blank' } })"
      @onPurchaseOnDiscord="() => navigateTo('/discord-ultimate', { external: true, open: { target: '_blank' } })"
    />
  </div>
</template>

<script setup lang="ts">
import {IconNames} from "assets/config/IconNames";
import useUpdateGeneratorMutation from "~/data/astro/mutations/useUpdateGeneratorMutation";
import {deepEqual} from "fast-equals";
import {useToast} from "~/components/ui/toast";
import type {GSVoiceRole, GSVoiceRoleAction} from "~/types/guild-settings/voice_role";
import {Select, SelectItem} from "~/components/ui/select";
import type {GSTemplate} from "~/types/guild-settings/template";
import {discord_regions} from "~/types/discord";

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

useHead({
  title: "Template settings - "
})

useSeoMeta({
  title: 'Template settings - Astro - Temporary Voice Channels for your Discord!',
  ogTitle: 'Template settings - Astro - Temporary Voice Channels for your Discord!',
  description: 'Configure this template settings',
  ogDescription: 'Configure this template settings',
  ogUrl: 'https://astro-bot.space/guilds'
})

const { toast } = useToast()
const route = useRoute()
const guild_id = useGuildId()
const template_id = ref(route.params.template_id as string | undefined)

watch(() => route.params, (params) => {
  template_id.value = params.template_id as string | undefined
})

const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_roles } = useGuildRoles(guild_id)
const { data: guild_settings, error: guild_settings_error } = useGuildSettings(guild_id)

const upgrade_dialog_open = ref(false)
const is_ultimate = computed(() => {
  if (guild_settings.value) {
    return isGuildUltimate(guild_settings.value)
  } else {
    return false
  }
})

const template_settings = computed(() => {
  return guild_settings.value ? [...guild_settings.value.templates].find(c => c.id == template_id.value) : undefined
})
const m_template_settings = ref<GSTemplate | undefined>(undefined)
const template_settings_edited = ref(false)


watch(template_settings, (new_template_settings) => {
  if (new_template_settings) {
    m_template_settings.value = useClone(new_template_settings)
  }
}, { deep: true, immediate: true })

watch(m_template_settings, (new_m_template_settings) => {
  if (!template_settings.value || !new_m_template_settings) {
    template_settings_edited.value = false
  } else {
    template_settings_edited.value = !deepEqual(new_m_template_settings, template_settings.value)
  }
}, { deep: true, immediate: true })


/// PROPERTIES ///
const vc_region_model = computed({
  get() {
    return m_template_settings.value?.vc_region != null && m_template_settings.value ?
      m_template_settings.value.vc_region : undefined
  },
  set(value) {
    if (m_template_settings.value) {
      if (value != 'no_region' && value)
        m_template_settings.value.vc_region = value
      else
        m_template_settings.value.vc_region = null
    }
  }
})


/// MUTATIONS ///
const { mutate: delete_template, isPending: delete_template_loading, error: delete_template_error, isSuccess: delete_template_success } = useDeleteTemplateMutation()
const { mutate: update_template, isPending: update_template_pending, error: update_template_error } = useUpdateTemplateMutation()
const { mutate: upgrade_guild } = useGuildUpgradeMutation()

/// SUCCESS ACTIONS ///
watch(guild_settings_error, (e) => {
  if (e instanceof AstroApiError && e.code == AstroApiErrorCode.ASTRO_NOT_IN_GUILD && guild_id.value) {
    useInvite().invite_to_guild(guild_id.value)
  }
})

watch(delete_template_success, (s) => {
  if (s) {
    navigateTo(`/guilds/${guild_id.value}/templates`)
  }
})

/// ERROR TOASTS ///
watch(delete_template_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})

watch(update_template_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})
</script>
