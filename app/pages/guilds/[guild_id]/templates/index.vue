<template>
  <div class="flex min-h-full flex-col gap-8">
    <div class="flex items-center gap-4">
      <IconTemplate class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span class="dashboard-section-title">{{ $t('templates.title') }}</span>
        <span class="dashboard-section-description">{{
          $t('templates.description')
        }}</span>
      </div>
      <div class="grow" />
      <Button
        :loading="create_template_loading"
        @click="create_template_clicked"
      >
        <Icon name="fluent:add-12-regular" />
        {{ $t('common.create') }}
      </Button>
    </div>

    <Dialog v-model:open="create_template_dialog_open">
      <DialogContent>
        <div class="flex flex-col gap-2">
          <p class="text-center text-xl">{{ $t('templates.create_title') }}</p>

          <div class="mt-4 flex max-h-[70vh] flex-col gap-6 overflow-y-scroll">
            <div class="groups-wrapper">
              <span class="text-group-name">{{
                $t('templates.usage_group')
              }}</span>
              <div class="groups-container">
                <GroupSetting
                  :heading="$t('common.name')"
                  :description="$t('templates.name_description')"
                >
                  <template #bottom-action>
                    <div class="flex gap-2">
                      <input
                        v-model="create_template_name"
                        :placeholder="$t('templates.name_placeholder')"
                        type="text"
                        class="grow"
                        minlength="1"
                        required
                      />
                    </div>
                  </template>
                </GroupSetting>

                <GroupSetting
                  :heading="$t('templates.generators.title')"
                  :description="$t('templates.generators.description')"
                >
                  <template #bottom-action>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        class="focus-visible:border-opacity-80 h-9 w-full rounded bordered bg-background px-2.5 py-1 focus-visible:border-pink-500"
                      >
                        {{
                          create_template_generators == null
                            ? $t('templates.generators.any')
                            : create_template_generators.length == 0
                              ? $t('templates.generators.none')
                              : $t(
                                  'templates.generators.count',
                                  { count: create_template_generators.length },
                                  create_template_generators.length,
                                )
                        }}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuCheckboxItem
                          :checked="create_template_generators == null"
                          @update:checked="
                            create_template_generators == null
                              ? (create_template_generators = [])
                              : (create_template_generators = null)
                          "
                        >
                          {{ $t('templates.generators.any') }}
                        </DropdownMenuCheckboxItem>

                        <DropdownMenuCheckboxItem
                          v-for="generator in guild_settings!.generators"
                          :key="generator.id"
                          :checked="
                            create_template_generators != null &&
                            create_template_generators.some(
                              (g) => g == generator.id,
                            )
                          "
                          @update:checked="
                            () => {
                              const was_checked =
                                create_template_generators != null &&
                                create_template_generators.some(
                                  (g) => g == generator.id,
                                )

                              if (was_checked) {
                                create_template_generators =
                                  create_template_generators!.filter(
                                    (g) => g != generator.id,
                                  )
                              } else {
                                if (create_template_generators == null) {
                                  create_template_generators = []
                                }

                                create_template_generators.push(generator.id)
                              }
                            }
                          "
                        >
                          {{
                            guild_channels!.find((c) => c.id == generator.id)
                              ?.name ?? $t('common.deleted_channel')
                          }}
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </template>
                </GroupSetting>
              </div>
            </div>

            <div class="groups-wrapper">
              <span class="text-group-name">{{
                $t('templates.vc_group')
              }}</span>
              <div class="groups-container">
                <GroupSetting
                  :heading="$t('common.name')"
                  :description="$t('templates.vc_name_description')"
                >
                  <template #bottom-action>
                    <div class="flex gap-2">
                      <input
                        :placeholder="$t('common.not_set')"
                        type="text"
                        :value="
                          create_template_vc_name != null
                            ? create_template_vc_name
                            : undefined
                        "
                        class="grow"
                        minlength="2"
                        maxlength="500"
                        @input="
                          ($event.target as HTMLInputElement).value
                            ? (create_template_vc_name = (
                                $event.target as HTMLInputElement
                              ).value)
                            : (create_template_vc_name = null)
                        "
                      />
                      <DashboardVariablesButton
                        :is-ultimate="is_ultimate"
                        @upgrade="upgrade_dialog_open = true"
                        @variable-select="
                          (v) =>
                            create_template_vc_name != null
                              ? (create_template_vc_name += v)
                              : (create_template_vc_name = v)
                        "
                      />
                    </div>
                  </template>
                </GroupSetting>

                <GroupSetting
                  :heading="$t('common.user_limit')"
                  :description="$t('templates.user_limit_description')"
                >
                  <template #bottom-action>
                    <input
                      :placeholder="$t('common.not_set')"
                      :value="
                        create_template_vc_user_limit != null
                          ? create_template_vc_user_limit
                          : undefined
                      "
                      type="number"
                      min="0"
                      max="99"
                      @input="
                        ($event.target as HTMLInputElement).value
                          ? (create_template_vc_user_limit = Number(
                              ($event.target as HTMLInputElement).value,
                            ))
                          : (create_template_vc_user_limit = null)
                      "
                    />
                  </template>
                </GroupSetting>

                <GroupSetting
                  :heading="$t('common.bitrate')"
                  :description="$t('templates.bitrate_description')"
                >
                  <template #bottom-action>
                    <div class="vertical-center relative">
                      <input
                        :placeholder="$t('common.not_set')"
                        :value="
                          create_template_vc_bitrate != null
                            ? create_template_vc_bitrate / 1000
                            : undefined
                        "
                        type="number"
                        min="8"
                        max="384"
                        class="grow"
                        @input="
                          ($event.target as HTMLInputElement).value
                            ? (create_template_vc_bitrate =
                                Number(
                                  ($event.target as HTMLInputElement).value,
                                ) * 1000)
                            : (create_template_vc_bitrate = null)
                        "
                      />
                      <span
                        :class="
                          cn(
                            'absolute text-foreground-secondary transition-all duration-100',
                            create_template_vc_bitrate == null
                              ? 'hidden'
                              : create_template_vc_bitrate >= 100000
                                ? 'left-10'
                                : create_template_vc_bitrate >= 10000
                                  ? 'left-8'
                                  : 'left-6',
                          )
                        "
                        >{{ $t('common.kbps') }}</span
                      >
                    </div>
                  </template>
                </GroupSetting>

                <GroupSetting
                  :heading="$t('common.region')"
                  :description="$t('templates.region_description')"
                >
                  <template #bottom-action>
                    <Select
                      v-model:model-value="create_template_vc_region_model"
                      @update:model-value="
                        (key) =>
                          (create_template_vc_region =
                            key !== 'no_region' ? key : null)
                      "
                    >
                      <SelectTrigger>
                        <SelectValue
                          :placeholder="$t('common.not_set')"
                          aria-label="value"
                          >{{
                            create_template_vc_region
                              ? $t(`regions.${create_template_vc_region}`)
                              : undefined
                          }}</SelectValue
                        >
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            v-for="region in discord_regions"
                            :key="region.key"
                            :value="region.key"
                          >
                            {{ region.emoji }} {{ $t(`regions.${region.key}`) }}
                          </SelectItem>

                          <SelectItem value="no_region">{{
                            $t('common.not_set')
                          }}</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </template>
                </GroupSetting>
                <!--              region-->
              </div>
            </div>
          </div>

          <div class="mt-8 flex flex-col justify-end gap-2 sm:flex-row">
            <Button @click="create_template_form_submission">
              {{ $t('common.create') }}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <DashboardUltimateRequiredDialog
      v-model:model-value="ultimate_required_dialog_open"
      @upgrade="
        () => {
          ultimate_required_dialog_open = false
          upgrade_dialog_open = true
        }
      "
    >
      {{ $t('templates.ultimate_required') }}
    </DashboardUltimateRequiredDialog>

    <div class="flex w-full items-center justify-center">
      <div v-if="guild_settings && guild_channels" class="w-full">
        <div
          v-if="guild_settings.templates.length > 0"
          class="group-setting p-0"
        >
          <div
            v-for="(template, i) in guild_settings.templates"
            :key="i"
            class="flex flex-col"
          >
            <div class="flex items-center gap-4 px-4 py-6">
              <IconTemplate class="size-4 shrink-0" />
              <span class="text-md">
                {{ template.name }}
              </span>
              <div class="grow" />
              <div
                class="flex flex-col items-center gap-2 md:flex-row md:gap-4"
              >
                <Button
                  @click="navigateTo(`${$route.fullPath}/${template.id}`)"
                >
                  {{ $t('common.manage') }}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <ButtonDestructive :loading="delete_template_loading">
                      {{ $t('common.delete') }}
                    </ButtonDestructive>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{{
                        $t('templates.delete_confirm_title')
                      }}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {{ $t('templates.delete_confirm_description') }}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>{{
                        $t('common.go_back')
                      }}</AlertDialogCancel>
                      <AlertDialogAction
                        :destructive="true"
                        :loading="delete_template_loading"
                        @click="
                          delete_template({
                            guild_id: guild_id!,
                            template_id: template.id,
                          })
                        "
                      >
                        {{ $t('common.delete') }}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <hr
              v-if="i !== guild_settings.templates.length - 1"
              class="w-full bordered"
            />
          </div>
        </div>
        <div
          v-else
          class="mt-12 flex min-h-full flex-col items-center justify-center gap-4"
        >
          <span class="text-center text-xl font-semibold">{{
            $t('templates.none')
          }}</span>
          <Button
            :loading="create_template_loading"
            @click="create_template_clicked"
          >
            <Icon name="fluent:add-12-regular" />
            {{ $t('common.create') }}
          </Button>
        </div>
      </div>
      <div v-else-if="guild_settings_error" class="grow">
        <span class="center text-foreground-destructive">{{
          $t('common.error_generic')
        }}</span>
      </div>
      <div v-else class="center">
        <IconLoading />
      </div>
    </div>

    <DashboardUpgradeDialog
      v-model:open="upgrade_dialog_open"
      @on-upgrade="
        (sub_id) => {
          upgrade_dialog_open = false
          upgrade_guild({ guild_id: guild_id!, subscription_id: sub_id })
        }
      "
      @on-purchase-on-website="
        () =>
          navigateTo('/ultimate', {
            external: true,
            open: { target: '_blank' },
          })
      "
      @on-purchase-on-discord="
        () =>
          navigateTo('/discord-ultimate', {
            external: true,
            open: { target: '_blank' },
          })
      "
    />
  </div>
</template>

<script lang="ts" setup>
import { navigateTo } from '#imports'
import cn from '~/utils/cn'
import isGuildUltimate from '~/utils/isGuildUltimate'
import { AError, AErrorCode } from '~/data/astro/core/AError'
import type { DashboardSection } from '~/types/dashboard'
import { useToast } from '~/components/ui/toast'
import { Select, SelectItem } from '~/components/ui/select'
import { discord_regions } from '~/types/discord'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
  section: {
    id: 6,
    name: 'dashboard.sections.templates',
    icon: 'astro:template',
    description: 'Template description',
  } as DashboardSection,
})

const { t } = useI18n()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.templates.title') }),
  meta: [
    { name: 'description', content: t('meta.templates.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: t('meta.templates.title') }),
    },
    { property: 'og:description', content: t('meta.templates.description') },
    { property: 'og:url', content: 'https://astro-bot.space/guilds/templates' },
  ],
}))

const { toast } = useToast()
const guild_id = useGuildId()
const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_settings, error: guild_settings_error } =
  useGuildSettings(guild_id)
const {
  mutate: create_template,
  isPending: create_template_loading,
  error: create_template_error,
} = useCreateTemplateMutation()
const {
  mutate: delete_template,
  isPending: delete_template_loading,
  error: delete_template_error,
} = useDeleteTemplateMutation()
const { mutate: upgrade_guild, error: upgrade_guild_error } =
  useGuildUpgradeMutation()

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
  if (
    guild_settings.value &&
    !is_ultimate.value &&
    guild_settings.value.templates.length > 2
  )
    ultimate_required_dialog_open.value = true
  else create_template_dialog_open.value = true
}

const create_template_vc_region_model = computed({
  get() {
    return create_template_vc_region.value != null
      ? create_template_vc_region.value
      : undefined
  },
  set(value) {
    if (value != 'no_region' && value) create_template_vc_region.value = value
    else create_template_vc_region.value = null
  },
})

const create_template_form_submission = () => {
  if (!create_template_name.value) {
    toast({
      description: t('templates.select_name'),
      variant: 'destructive',
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
        vc_region: create_template_vc_region.value,
      },
    })

    create_template_dialog_open.value = false
  }
}

watch(upgrade_guild_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(guild_settings_error, (e) => {
  if (
    e instanceof AError &&
    e.code === AErrorCode.BOT_NOT_IN_GUILD &&
    guild_id.value
  ) {
    useInvite().invite_to_guild(guild_id.value)
  }
})

watch(create_template_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(delete_template_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})
</script>
