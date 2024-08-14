<template>
  <div class="flex flex-col gap-8">
    <DashboardSettingsSaveToast
      :open="generator_settings_edited"
      :loading="update_generator_pending"
      @save="update_generator({ guild_id: guild_id!, generator_id: generator_id!, generator_settings: m_generator_settings! })"
      @reset="m_generator_settings = useClone(generator_settings)"
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

    <div class="flex flex-col gap-12" v-if="m_generator_settings && guild_channels && guild_roles">
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
                <DashboardVariablesButton @variableSelect="(v) => m_generator_settings!.default_name += v" :is_ultimate="is_ultimate" />
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
                <DashboardVariablesButton @variableSelect="(v) => m_generator_settings!.default_locked_name += v" :is_ultimate="is_ultimate"/>
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
                <DashboardVariablesButton @variableSelect="(v) => m_generator_settings!.default_hidden_name += v" :is_ultimate="is_ultimate" />
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
                v-model:model-value="category_id"
                @update:model-value="(category_id) => m_generator_settings!.category = category_id !== 'no_category' ? category_id : null"
                >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{category}}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="category in guild_channels.filter(c => c.type == 4)"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </SelectItem>
                    <!-- 'No category' option -->
                    <SelectItem value="no_category">No category</SelectItem>
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
                required
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

          <GroupSetting
            heading="User limit"
            description="The user limit, or 0 for no user limit"
            compact
          >
            <template #bottom-action>
              <input
                v-model="m_generator_settings.user_limit"
                type="number"
                min="0"
                max="99"
                required
              >
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Bitrate"
            description="The bitrate in kbps, or 0 for using your Discord server default bitrate"
            compact
          >
            <template #bottom-action>
              <div class="relative vertical-center">
                <input
                  v-bind:value="m_generator_settings.bitrate / 1000"
                  @input="m_generator_settings.bitrate = $event.target.value * 1000"
                  type="number"
                  min="0"
                  max="384"
                  class="grow"
                  required
                >
                <span :class="cn('absolute text-foreground-secondary transition-all duration-100', m_generator_settings.bitrate >= 100000 ? 'left-10' : m_generator_settings.bitrate >= 10000 ? 'left-8' : 'left-6')">kbps</span>
              </div>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Region "
            compact
          >
            <template #description>
              <span class="text-foreground-secondary">
                To change region that is applied to temporary voice channels, change the region of the generator, using the channel settings inside Discord.
                <ButtonText
                  class="text-foreground-link-standout"
                  @click="navigateTo(
                    'https://support.discord.com/hc/en-us/articles/1500007645701-Voice-Regions-on-Discord-FAQ#h_01F3RXJ4YCHYS652ETKWJ499Y3',
                    { open: { target: '_blank' } }
                  )"
                >
                  See guide
                </ButtonText>
              </span>
            </template>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">VOICE CHANNEL PERMISSIONS</span>
        <div class="groups-container-compact flex-wrap">
          <GroupSetting
            heading="Inheriting"
            description="Choose if temporary voice channels inherit permissions from the generator, the category in which they are generated, or if they should not inherit any permissions"
            compact
          >
            <template #bottom-action>
              <Select
                required
                v-model:model-value="m_generator_settings.permissions_inherited"
                @update:modelValue="(v) => m_generator_settings!.permissions_inherited = GSGeneratorPermissionsInherited[v as keyof typeof GSGeneratorPermissionsInherited]"
              >
                <SelectTrigger>
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="v in Object.values(GSGeneratorPermissionsInherited)"
                      :value="v"
                    >
                      {{capitalize(v)}}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Target role"
            description="Astro will modify the permissions of this role when needed, for example when a user locks or hides the channel"
            compact
          >
            <template #bottom-action>
              <Select
                v-model:model-value="target_role_id"
                @update:model-value="(role_id) => m_generator_settings!.permissions_target_role = role_id !== 'no_role' ? role_id : null"
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{target_role}}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="role in guild_roles.filter(r => r.id !== guild_id).sort((a, b) => a.position - b.position)"
                      :key="role.id"
                      :value="role.id"
                    >
                      <div class="vertical-center gap-2">
                        <span :class="`size-3 rounded-full min-w-3 min-h-3`" :style="`background-color: #${role.color.toString(16)}`"></span>
                        {{ role.name }}
                      </div>
                    </SelectItem>
                    <!-- @everyone role option -->
                    <SelectItem value="no_role">@everyone</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Moderator role"
            description="This role will always have permissions to manage the channel, even when the channel is locked or hidden"
            compact
          >
            <template #bottom-action>
              <Select
                v-model:model-value="moderator_role_id"
                @update:model-value="(role_id) => m_generator_settings!.permissions_immune_role = role_id !== 'no_role' ? role_id : null"
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{moderator_role}}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="role in guild_roles.filter(r => r.id !== guild_id).sort((a, b) => a.position - b.position)"
                      :key="role.id"
                      :value="role.id"
                    >
                      <div class="vertical-center gap-2">
                        <span :class="`size-3 rounded-full min-w-3 min-h-3`" :style="`background-color: #${role.color.toString(16)}`"></span>
                        {{ role.name }}
                      </div>
                    </SelectItem>
                    <!-- @everyone role option -->
                    <SelectItem value="no_role">No role</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">OWNER SETTINGS</span>
        <div class="groups-container">
          <GroupSetting
            heading="Owner permissions"
            description="Those permissions will be applied to the temporary voice channel owner."
          >
            <template #bottom-action>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Owner role"
            description="This role will be given to temporary voice channel owners"
            class="relative"
            ultimate
          >
              <Select
                :disabled="!is_ultimate"
                v-model:model-value="owner_role_id"
                @update:model-value="(role_id) => m_generator_settings!.owner_role = role_id !== 'no_role' ? role_id : null"
              >
                <SelectTrigger class="w-fit">
                  <SelectValue aria-label="value">{{owner_role}}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="role in guild_roles.filter(r => r.id !== guild_id).sort((a, b) => a.position - b.position)"
                      :key="role.id"
                      :value="role.id"
                    >
                      <div class="vertical-center gap-2">
                        <span :class="`size-3 rounded-full min-w-3 min-h-3`" :style="`background-color: #${role.color.toString(16)}`"></span>
                        {{ role.name }}
                      </div>
                    </SelectItem>
                    <!-- no role option -->
                    <SelectItem value="no_role">No role</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
import {IconNames} from "assets/config/IconNames";
import useUpdateGeneratorMutation from "~/data/astro/mutations/useUpdateGeneratorMutation";
import type {GSGenerator} from "~/types/guild-settings/generator";
import {deepEqual} from "fast-equals";
import {Select, SelectItem} from "~/components/ui/select";
import {useToast} from "~/components/ui/toast";

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { toast } = useToast()
const route = useRoute()
const guild_id = useGuildId()
const generator_id = ref(route.params.generator_id as string | undefined)

watch(() => route.params, (params) => {
  generator_id.value = params.generator_id as string | undefined
})

const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_roles } = useGuildRoles(guild_id)
const { data: guild_settings, error: guild_settings_error } = useGuildSettings(guild_id)
const is_ultimate = computed(() => {
  if (guild_settings.value) {
    return isGuildUltimate(guild_settings.value)
  } else {
    return false
  }
})
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
const category_id = computed({
  get() {
    return m_generator_settings.value?.category ?? 'no_category'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.category = value !== 'no_category' ? value : null
    }
  },
});
const category = computed(() => {
  return guild_channels.value?.find(c => c.id === category_id.value)?.name ?? 'No category'
});

const target_role_id = computed({
  get() {
    return m_generator_settings.value?.permissions_target_role ?? 'no_role'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.permissions_target_role = value !== 'no_role' ? value : null
    }
  }
})
const target_role = computed(() => {
  return guild_roles.value?.find(r => r.id === target_role_id.value)?.name ?? '@everyone'
})

const moderator_role_id = computed({
  get() {
    return m_generator_settings.value?.permissions_immune_role ?? 'no_role'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.permissions_immune_role = value !== 'no_role' ? value : null
    }
  }
})
const moderator_role = computed(() => {
  return guild_roles.value?.find(r => r.id === moderator_role_id.value)?.name ?? 'Not set'
})

const owner_role_id = computed({
  get() {
    return m_generator_settings.value?.owner_role ?? 'no_role'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.owner_role = value !== 'no_role' ? value : null
    }
  }
})
const owner_role = computed(() => {
  return guild_roles.value?.find(r => r.id === owner_role_id.value)?.name ?? 'Not set'
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
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})

watch(update_generator_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})
</script>