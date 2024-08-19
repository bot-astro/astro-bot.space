<template>
  <div class="flex min-h-full flex-col gap-8">
    <div class="flex items-center gap-4">
      <IconTemplate class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span class="dashboard-section-title">Templates</span>
        <span class="dashboard-section-description">Templates let users apply multiple settings at once to their temporary voice channel!</span>
      </div>
      <div class="flex-grow" />
      <Button
        :loading="create_template_loading"
        @click="create_template_clicked"
      >
        <Icon name="fluent:add-12-regular" />
        Create
      </Button>
    </div>

    <Dialog v-model:open="create_template_dialog_open">
      <DialogContent>
        <div class="flex flex-col gap-2">
          <p class="text-xl text-center">
            Create template
          </p>

          <div class="flex flex-col gap-6 max-h-[70vh] overflow-y-scroll mt-4">
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
                        v-model="create_template_name"
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
                  <template #bottom-action>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        class="w-full bg-background rounded bordered h-9 py-1 px-2.5 focus-visible:border-pink-500 focus-visible:border-opacity-80"
                      >
                        {{create_template_generators == null ? 'Any generator' : create_template_generators.length == 0 ? 'Disabled for every generator' : `Allowed in ${create_template_generators.length} generators`}}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuCheckboxItem
                          v-bind:checked="create_template_generators == null"
                          @update:checked="create_template_generators == null ? create_template_generators = [] : create_template_generators = null"
                        >
                          Any generator
                        </DropdownMenuCheckboxItem>

                        <DropdownMenuCheckboxItem
                          v-for="generator in guild_settings!.generators"
                          :key="generator.id"
                          v-bind:checked="create_template_generators != null && create_template_generators.some(g => g == generator.id)"
                          @update:checked="() => {
                            const was_checked = create_template_generators != null && create_template_generators.some(g => g == generator.id)

                            if (was_checked) {
                              create_template_generators = create_template_generators!.filter(g => g != generator.id)
                            } else {
                              if (create_template_generators == null) {
                                create_template_generators = []
                              }

                              create_template_generators.push(generator.id)
                            }
                          }"
                        >
                          {{guild_channels!.find(c => c.id == generator.id)?.name ?? 'Deleted channel'}}
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </template>
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
                        v-bind:value="create_template_vc_name != null ? create_template_vc_name : undefined"
                        @input="$event.target.value ? (create_template_vc_name = $event.target.value) : (create_template_vc_name = null)"
                        class="grow"
                        minlength="2"
                        maxlength="500"
                      >
                      <DashboardVariablesButton @upgrade="upgrade_dialog_open = true" @variableSelect="(v) => create_template_vc_name != null ? (create_template_vc_name += v) : (create_template_vc_name = v)" :is_ultimate="is_ultimate" />
                    </div>
                  </template>
                </GroupSetting>

                <GroupSetting
                  heading="User limit"
                  description="The user limit applied to the temporary voice channel"
                >
                  <template #bottom-action>
                    <input
                      placeholder="Not set"
                      v-bind:value="create_template_vc_user_limit != null ? create_template_vc_user_limit : undefined"
                      @input="$event.target.value ? (create_template_vc_user_limit = $event.target.value) : (create_template_vc_user_limit = null)"
                      type="number"
                      min="0"
                      max="99"
                    >
                  </template>
                </GroupSetting>

                <GroupSetting
                  heading="Bitrate"
                  description="The bitrate in kbps that gets applied to the temporary voice channel"
                >
                  <template #bottom-action>
                    <div class="relative vertical-center">
                      <input
                        placeholder="Not set"
                        v-bind:value="create_template_vc_bitrate != null ? create_template_vc_bitrate / 1000 : undefined"
                        @input="$event.target.value ? (create_template_vc_bitrate = $event.target.value * 1000) : (create_template_vc_bitrate = null)"
                        type="number"
                        min="8"
                        max="384"
                        class="grow"
                      >
                      <span :class="cn('absolute text-foreground-secondary transition-all duration-100', create_template_vc_bitrate == null ? 'hidden' : create_template_vc_bitrate >= 100000 ? 'left-10' : create_template_vc_bitrate >= 10000 ? 'left-8' : 'left-6')">kbps</span>
                    </div>
                  </template>
                </GroupSetting>

                <GroupSetting
                  heading="Region"
                  description="The voice region applied to temporary voice channels"
                >
                  <template #bottom-action>
                    <Select
                      v-model:model-value="create_template_vc_region_model"
                      @update:model-value="(key) => create_template_vc_region = key !== 'no_region' ? key : null"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Not set" aria-label="value">{{discord_regions.find(r => r.key == create_template_vc_region)?.name}}</SelectValue>
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
                <!--              region-->
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-end mt-8 gap-2">
            <Button @click="create_template_form_submission">
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
      Ultimate is required to have more than 3 templates. Upgrade your server to Ultimate to create more templates.
    </DashboardUltimateRequiredDialog>

    <div class="flex w-full items-center justify-center">
      <div v-if="guild_settings && guild_channels" class="w-full">
        <div v-if="guild_settings.templates.length > 0" class="group p-0">
          <div v-for="(template, i) in guild_settings.templates" class="flex flex-col">
            <div class="flex items-center gap-4 px-4 py-6">
              <IconTemplate class="flex-shrink-0 size-4" />
              <span class="text-md">
                {{ template.name }}
              </span>
              <div class="grow" />
              <div class="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <Button @click="navigateTo(`${$route.fullPath}/${template.id}`)">
                  Manage
                </Button>
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
                        @click="delete_template({ guild_id: guild_id!, template_id: template.id })"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <hr class="w-full bordered" v-if="i !== (guild_settings.templates.length - 1)">
          </div>
        </div>
        <div v-else class="flex min-h-full flex-col items-center justify-center gap-4 mt-12">
          <span class="text-center text-xl font-semibold">You didn't create any template yet!</span>
          <Button
            :loading="create_template_loading"
            @click="create_template_clicked"
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
import {discord_regions} from "../../../../types/discord";

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 6,
    name: 'Templates',
    icon: 'astro:template',
    description: 'Template description',
  } as DashboardSection
})

useHead({
  title: "Templates - "
})

useSeoMeta({
  title: 'Templates - Astro - Temporary Voice Channels for your Discord!',
  ogTitle: 'Templates - Astro - Temporary Voice Channels for your Discord!',
  description: 'Create, view and delete templates for your server',
  ogDescription: 'Create, view and delete templates for your server',
})

const { toast } = useToast()
const guild_id = useGuildId()
const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_settings, isError: guild_settings_error } = useGuildSettings(guild_id)
const { mutate: create_template, isPending: create_template_loading, error: create_template_error } = useCreateTemplateMutation()
const { mutate: delete_template, isPending: delete_template_loading, error: delete_template_error } = useDeleteTemplateMutation()
const { mutate: upgrade_guild } = useGuildUpgradeMutation()

const create_template_dialog_open = ref(false)
const create_template_name = ref<string>('')
const create_template_generators = ref<string[] | null>(null)
const create_template_vc_name = ref<string | null>(null)
const create_template_vc_user_limit = ref<number | null>(null)
const create_template_vc_bitrate = ref<number | null>(null)
const create_template_vc_region = ref<string | null>(null)

const is_ultimate = computed(() => {
  if (guild_settings.value) {
    return isGuildUltimate(guild_settings.value)
  } else {
    return false
  }
})

const ultimate_required_dialog_open = ref(false)
const upgrade_dialog_open = ref(false)

const create_template_clicked = () => {
  if(guild_settings.value && !is_ultimate.value && guild_settings.value.templates.length > 2)
    ultimate_required_dialog_open.value = true
  else
    create_template_dialog_open.value = true
}

const create_template_vc_region_model = computed({
  get() {
    return create_template_vc_region.value != null ? create_template_vc_region.value : undefined
  },
  set(value) {
    if (value != 'no_region' && value)
      create_template_vc_region.value = value
    else
      create_template_vc_region.value = null
  }
})

const create_template_form_submission = () => {
  if (!create_template_name.value) {
    toast({
      description: 'Please select a name for the template',
      variant: 'destructive'
    })
  } else {
    create_template({
      guild_id: guild_id.value!,
      template_settings: {
        id: '',
        name: create_template_name.value,
        enabled_generator_ids: create_template_generators.value,
        vc_name: create_template_vc_name.value,
        vc_bitrate: create_template_vc_bitrate.value,
        vc_limit: create_template_vc_user_limit.value,
        vc_region: create_template_vc_region.value
      }
    })

    create_template_dialog_open.value = false
  }
}

watch(guild_settings_error, (e) => {
  if (e instanceof AstroApiError && e.code == AstroApiErrorCode.ASTRO_NOT_IN_GUILD && guild_id.value) {
    useInvite().invite_to_guild(guild_id.value)
  }
})

watch(create_template_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})

watch(delete_template_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})
</script>