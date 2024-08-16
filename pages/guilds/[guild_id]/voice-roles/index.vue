<template>
  <div class="flex min-h-full flex-col gap-8">
    <div class="flex items-center gap-4">
      <IconVoiceRole />
      <div class="flex flex-col">
        <span class="dashboard-section-title">Voice roles</span>
        <span class="dashboard-section-description">Voice roles allow to give temporary roles to users inside specific voice channels!</span>
      </div>
      <div class="flex-grow" />
      <Button
        :loading="create_voice_role_loading"
        @click="create_voice_role_clicked"
      >
        <Icon name="fluent:add-12-regular" />
        Create
      </Button>
    </div>

    <Dialog v-model:open="create_voice_role_dialog_open">
      <DialogContent>
        <div class="flex flex-col gap-2">
          <p class="text-xl text-center">
            Create voice role
          </p>

          <div class="groups-wrapper mt-4 max-h-[70vh] overflow-y-scroll">
            <div class="groups-container">
              <GroupSetting
                heading="Channel"
              >
                <template #description>
                  <span class="text-foreground-secondary">
                   Channel that triggers this voice role. If you select a category, all channels of that category will trigger this voice role.<br>If you select a generator, all temporary voice channels generated from it will trigger this voice role.
                  </span>
                </template>
                <template #bottom-action>
                  <Select
                    v-model:model-value="create_voice_role_channel_id"
                    @update:model-value="(id) => create_voice_role_channel_id = id"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a channel" aria-label="value">{{guild_channels?.find(c => c.id == create_voice_role_channel_id)?.name ?? ''}}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="channel in guild_channels.filter(c => c.type == 2 || c.type == 4 || c.type == 13)"
                          :key="channel.id"
                          :value="channel.id"
                        >
                          {{ channel.name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </template>
              </GroupSetting>

              <GroupSetting
                heading="Role"
                description="This role will be applied when a user joins the channel selected above"
              >
                <template #bottom-action>
                  <Select
                    v-model:model-value="create_voice_role_role_id"
                    @update:model-value="(role_id) => create_voice_role_role_id = role_id"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" aria-label="value">{{guild_roles?.find(r => r.id == create_voice_role_role_id)?.name ?? ''}}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="role in guild_roles.filter(r => r.id !== guild_id).sort((a, b) => b.position - a.position)"
                          :key="role.id"
                          :value="role.id"
                        >
                          <div class="vertical-center gap-2">
                            <span :class="`size-3 rounded-full min-w-3 min-h-3`" :style="`background-color: #${role.color.toString(16)}`"></span>
                            {{ role.name }}
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </template>
              </GroupSetting>

              <GroupSetting
                heading="Action"
                description="Assign means Astro will give the role to the user when he joins the channel and remove it when he leaves. Remove does the opposite. Toggle behaves like 'Assign' if the user doesn't have the role, 'Remove' otherwise"
              >
                <template #bottom-action>
                  <Select
                    required
                    v-model:model-value="create_voice_role_action"
                    @update:modelValue="(v) => create_voice_role_action = GSVoiceRoleAction[v as keyof typeof GSVoiceRoleAction]"
                  >
                    <SelectTrigger>
                      <SelectValue></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="v in Object.values(GSVoiceRoleAction)"
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
                heading="Permanent"
                description="If enabled, Astro will not revert the action when the user leaves the channel"
              >
                <Switch v-model:checked="create_voice_role_permanent" />
              </GroupSetting>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-end mt-8 gap-2">
            <Button @click="create_voice_role_form_submission">
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <DashboardUltimateRequiredDialog
      v-model:model-value="ultimate_required_dialog_open"
      @upgrade="ultimate_required_dialog_open=false; upgrade_dialog_open=true"
    >
      Ultimate is required to have more than 1 voice role. Upgrade your server to Ultimate to create more voice roles.
    </DashboardUltimateRequiredDialog>

    <div class="flex w-full items-center justify-center">
      <div v-if="guild_settings && guild_channels" class="w-full">
        <div v-if="guild_settings.connections.length > 0" class="group p-0">
          <div v-for="(voice_role, i) in guild_settings.connections" class="flex flex-col">
            <div class="flex items-center gap-4 px-4 py-6">
              <Icon :name="IconNames.VOICE_ROLE" class="flex-shrink-0 size-4" />
              <div class="flex flex-col gap-2 sm:gap-0">
                <div class="flex flex-col sm:flex-row gap-0 sm:gap-2">
                  <span class="text-foreground-secondary">Channel: </span>
                  <div class="vertical-center gap-2">
                    {{ guild_channels.find(c => c.id == voice_role.id)?.name ?? "Deleted channel" }}
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-0 sm:gap-2">
                  <span class="text-foreground-secondary">Role: </span>
                  <div class="vertical-center gap-2">
                    <span :class="`size-3 rounded-full min-w-3 min-h-3`" :style="`background-color: #${guild_roles.find(r => r.id == voice_role.role_id)?.color?.toString(16) ?? '000000' }`"></span>
                    {{ guild_roles.find(r => r.id == voice_role.role_id)?.name ?? "Deleted role" }}
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-0 sm:gap-2">
                  <span class="text-foreground-secondary" v-if="guild_channels.find(c => c.id == voice_role.id)?.parent_name">Category: </span>
                  <span class="text-foreground-secondary" v-else>Not in a category</span>
                  <div class="vertical-center gap-2" v-if="guild_channels.find(c => c.id == voice_role.id)?.parent_name">
                    {{ guild_channels.find(c => c.id == voice_role.id)?.parent_name }}
                  </div>
                </div>
              </div>
              <div class="grow" />
              <div class="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <Button @click="navigateTo(`${$route.fullPath}/${voice_role.id}`)">
                  Manage
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <ButtonDestructive
                      :loading="delete_voice_role_loading"
                    >
                      Delete
                    </ButtonDestructive>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to delete the voice role?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be un-done and you wont be able to restore this voice role!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Go back</AlertDialogCancel>
                      <AlertDialogAction
                        :destructive="true"
                        :loading="delete_voice_role_loading"
                        @click="delete_voice_role({ guild_id: guild_id!, channel_id: voice_role.id })"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <hr class="w-full bordered" v-if="i !== (guild_settings.connections.length - 1)">
          </div>
        </div>
        <div v-else class="flex min-h-full flex-col items-center justify-center gap-4 mt-12">
          <span class="text-center text-xl font-semibold">You didn't create any voice role yet!</span>
          <Button
            :loading="create_voice_role_loading"
            @click="create_voice_role_clicked"
          >
            <Icon name="fluent:add-12-regular" />
            Create
          </Button>
        </div>
      </div>
      <div v-else-if="guild_settings_error" class="grow">
        <span class="center text-foreground-destructive">Something went wrong, please try again later</span>
      </div>
      <div v-else class="center">
        <IconLoading />
      </div>
    </div>

    <DashboardUpgradeDialog
      v-model:open="upgrade_dialog_open"
      @onUpgrade="(sub_id) => { upgrade_dialog_open = false; upgrade_guild({ guild_id: guild_id!, subscription_id: sub_id }) }"
      @onPurchaseOnWebsite="() => navigateTo('/ultimate', { external: true, open: { target: '_blank' } })"
      @onPurchaseOnDiscord="() => navigateTo('/discord-ultimate', { external: true, open: { target: '_blank' } })"
    />
  </div>
</template>

<script lang="ts" setup>
import {IconNames} from "assets/config/IconNames";
import type {DashboardSection} from "~/types/dashboard";
import {useToast} from "~/components/ui/toast";
import {Select, SelectItem} from "~/components/ui/select";
import type {GSVoiceRoleAction} from "~/types/guild-settings/voice_role";
import IconVoiceRole from "~/components/icon/IconVoiceRole.vue";

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 5,
    name: 'Voice role',
    icon: 'astro:voice-role',
    description: 'Voice Role description',
  } as DashboardSection
})

const { toast } = useToast()
const guild_id = useGuildId()
const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_roles } = useGuildRoles(guild_id)
const { data: guild_settings, isError: guild_settings_error } = useGuildSettings(guild_id)
const { mutate: create_voice_role, isPending: create_voice_role_loading, error: create_voice_role_error } = useCreateVoiceRoleMutation()
const { mutate: delete_voice_role, isPending: delete_voice_role_loading, error: delete_voice_role_error } = useDeleteVoiceRoleMutation()
const { mutate: upgrade_guild } = useGuildUpgradeMutation()

const create_voice_role_dialog_open = ref(false)
const create_voice_role_channel_id = ref<string>(undefined)
const create_voice_role_role_id = ref<string>(undefined)
const create_voice_role_action = ref<GSVoiceRoleAction>(GSVoiceRoleAction.ASSIGN)
const create_voice_role_permanent = ref<boolean>(false)

const is_ultimate = computed(() => {
  if (guild_settings.value) {
    return isGuildUltimate(guild_settings.value)
  } else {
    return false
  }
})

const ultimate_required_dialog_open = ref(false)
const upgrade_dialog_open = ref(false)

const create_voice_role_clicked = () => {
  if(guild_settings.value && !is_ultimate.value && guild_settings.value.connections.length > 0)
    ultimate_required_dialog_open.value = true
  else
    create_voice_role_dialog_open.value = true
}

const create_voice_role_form_submission = () => {
  if (!create_voice_role_channel_id.value || !create_voice_role_role_id.value) {
    toast({
      description: 'Please select a channel and role to create the voice role',
      variant: 'destructive'
    })
  } else {
    create_voice_role({
      guild_id: guild_id.value!,
      voice_role_settings: {
        id: create_voice_role_channel_id.value,
        role_id: create_voice_role_role_id.value,
        action: create_voice_role_action.value,
        permanent_dashboard: create_voice_role_permanent.value
      }
    })

    create_voice_role_dialog_open.value = false
  }
}

watch(create_voice_role_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})

watch(delete_voice_role_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})
</script>