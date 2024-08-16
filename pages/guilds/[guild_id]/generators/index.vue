<template>
  <div class="flex min-h-full flex-col gap-8">
    <div class="flex items-center gap-4">
      <IconGenerator class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span class="dashboard-section-title">Generators</span>
        <span class="dashboard-section-description">Manage temporary voice channels generators here!</span>
      </div>
      <div class="flex-grow" />
      <Button
        :loading="create_generator_loading"
        @click="() => {
            if(guild_settings && !is_ultimate && guild_settings.generators.length > 1)
              ultimate_required_dialog_open = true
            else
              create_generator({ guild_id: guild_id! })
          }
         "
      >
        <Icon name="fluent:add-12-regular" />
        Create
      </Button>
    </div>

    <DashboardUltimateRequiredDialog
      v-model:model-value="ultimate_required_dialog_open"
      @upgrade="ultimate_required_dialog_open=false; upgrade_dialog_open=true"
    >
      Ultimate is required to have more than 2 temporary voice channel generators. Upgrade your server to Ultimate to create more generators.
    </DashboardUltimateRequiredDialog>

    <div class="flex w-full items-center justify-center">
      <div v-if="guild_settings && guild_channels" class="w-full">
        <div v-if="guild_settings.generators.length > 0" class="group p-0">
          <div v-for="(gen, i) in guild_settings.generators" class="flex flex-col">
            <div class="flex items-center gap-4 px-4 py-6">
              <IconGenerator class="flex-shrink-0 size-4" />
              <div class="flex flex-col">
                <span class="text-md">
                  {{ guild_channels.find(c => c.id == gen.id)?.name ?? "Deleted channel" }}
                </span>
                <span class="text-foreground-secondary">
                  {{ guild_channels.find(c => c.id == gen.id)?.parent_name ? `Category: ${guild_channels.find(c => c.id == gen.id)?.parent_name}` : "Not in a category" }}
                </span>
              </div>
              <div class="grow" />
              <div class="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <Button @click="navigateTo(`${$route.fullPath}/${gen.id}`)">
                  Manage
                </Button>
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
                        @click="delete_generator({ guild_id: guild_id!, generator_id: gen.id })"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <hr class="w-full bordered" v-if="i !== (guild_settings.generators.length - 1)">
          </div>
        </div>
        <div v-else class="flex min-h-full flex-col items-center justify-center gap-4">
          <span class="text-center text-xl font-semibold">You didn't create any generator yet!</span>
          <Button
            :loading="create_generator_loading"
            @click="create_generator({ guild_id: guild_id! })"
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
import DashboardUltimateRequiredDialog from "~/components/dashboard/DashboardUltimateRequiredDialog.vue";

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 3,
    name: 'Generators',
    icon: 'astro:generator',
    description: 'Generators Description',
  } as DashboardSection
})

const { toast } = useToast()
const guild_id = useGuildId()
const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_settings, isError: guild_settings_error } = useGuildSettings(guild_id)
const { mutate: create_generator, isPending: create_generator_loading, error: create_generator_error } = useCreateGeneratorMutation()
const { mutate: delete_generator, isPending: delete_generator_loading, error: delete_generator_error } = useDeleteGeneratorMutation()
const { mutate: upgrade_guild } = useGuildUpgradeMutation()

const is_ultimate = computed(() => {
  if (guild_settings.value) {
    return isGuildUltimate(guild_settings.value)
  } else {
    return false
  }
})

const ultimate_required_dialog_open = ref(false)
const upgrade_dialog_open = ref(false)

watch(create_generator_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})

watch(delete_generator_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})
</script>
