<template>
  <div class="flex min-h-full flex-col gap-8">
    <div class="flex items-center gap-4">
      <Icon :name="IconNames.TEMPLATE" class="size-10" />
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

          <div class="groups-wrapper mt-4 max-h-[70vh] overflow-y-scroll">
            <div class="groups-container">
<!--              name, generators, bitrate, user limit, name, region-->
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
              <Icon :name="IconNames.TEMPLATE" class="flex-shrink-0 size-4" />
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

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 6,
    name: 'Templates',
    icon: 'i-lucide-layout-template',
    description: 'Template description',
  } as DashboardSection
})

const { toast } = useToast()
const guild_id = useGuildId()
const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_settings, isError: guild_settings_error } = useGuildSettings(guild_id)
const { mutate: create_template, isPending: create_template_loading, error: create_template_error } = useCreateTemplateMutation()
const { mutate: delete_template, isPending: delete_template_loading, error: delete_template_error } = useDeleteTemplateMutation()
const { mutate: upgrade_guild } = useGuildUpgradeMutation()

const create_template_dialog_open = ref(false)

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

const create_template_form_submission = () => {
  if (!create_template_channel_id.value || !create_template_role_id.value) {
    toast({
      description: 'Please select a channel and role to create the voice role',
      variant: 'destructive'
    })
  } else {
    create_template({
      guild_id: guild_id.value!,
      template_settings: {
      }
    })

    create_template_dialog_open.value = false
  }
}

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