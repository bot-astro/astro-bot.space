<template>
  <div class="mb-64 flex flex-col gap-8">
    <DashboardSettingsSaveToast
      :open="interface_settings_edited"
      :loading="update_interface_pending"
      @save="
        update_interface(
          {
            guild_id: guild_id!,
            interface_id: interface_id!,
            interface_settings: m_interface_settings!,
          },
          {
            onSuccess: on_interface_updated,
          },
        )
      "
      @reset="m_interface_settings = useClone(interface_settings)"
    />

    <div class="flex flex-wrap items-center gap-4">
      <IconInterface class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span v-if="guild_channels" class="dashboard-section-title">
          {{
            guild_channels.find((c) => c.id == interface_settings?.channel_id)
              ?.name ?? 'Deleted channel'
          }}
        </span>
        <Skeleton v-else class="h-10 w-72" />
        <span class="dashboard-section-description"
          >Manage the message and buttons of this interface!</span
        >
      </div>
      <div class="flex grow flex-wrap justify-end gap-2">
        <ButtonSecondary
          :loading="move_interface_loading"
          @click="open_move_dialog"
        >
          Move
        </ButtonSecondary>
        <AlertDialog>
          <AlertDialogTrigger>
            <ButtonDestructive :loading="delete_interface_loading">
              Delete
            </ButtonDestructive>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle
                >Are you sure you want to delete the
                interface?</AlertDialogTitle
              >
              <AlertDialogDescription>
                This action cannot be un-done and you wont be able to restore
                this interface!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Go back</AlertDialogCancel>
              <AlertDialogAction
                :destructive="true"
                :loading="delete_interface_loading"
                @click="
                  delete_interface({
                    guild_id: guild_id!,
                    interface_id: interface_id!,
                  })
                "
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>

    <Dialog v-model:open="move_dialog_open">
      <DialogContent>
        <div class="flex flex-col gap-2">
          <p class="text-center text-xl">Move interface</p>

          <div class="mt-4 flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <div class="flex flex-col">
                <span class="text-heading">Channel</span>
                <span class="text-description"
                  >The interface message is sent in the new channel and the old
                  interface is deleted</span
                >
              </div>
              <Select v-model:model-value="move_channel_id">
                <SelectTrigger>
                  <SelectValue aria-label="value">{{
                    guild_channels?.find((c) => c.id === move_channel_id)
                      ?.name ?? 'Select a channel'
                  }}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="channel in (guild_channels ?? []).filter(
                        (c) => c.type == 0,
                      )"
                      :key="channel.id"
                      :value="channel.id"
                    >
                      {{ channel.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="mt-8 flex flex-col justify-end gap-2 sm:flex-row">
            <ButtonSecondary @click="move_dialog_open = false">
              Go back
            </ButtonSecondary>
            <Button
              :loading="move_interface_loading"
              :disabled="
                !move_channel_id ||
                move_channel_id == interface_settings?.channel_id
              "
              @click="on_move_interface"
            >
              Move
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <div v-if="m_interface_settings" class="flex flex-col gap-12">
      <div class="groups-wrapper">
        <div class="vertical-center gap-2">
          <span class="text-group-name">MESSAGE HEADER</span>
          <Badge v-if="!is_ultimate" variant="ultimate">Ultimate</Badge>
        </div>
        <div class="groups-container">
          <GroupSetting
            heading="Author"
            description="The name shown at the top of the message"
            :ultimate="!is_ultimate"
            hide-ultimate-badge
            @upgrade="upgrade_dialog_open = true"
          >
            <template #bottom-action>
              <input
                v-model="m_interface_settings.embed_style.author_name"
                placeholder="Not set"
                type="text"
                class="grow"
                maxlength="256"
                :disabled="!is_ultimate"
              />
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Author link"
            description="The link that opens when users click the author name"
            :ultimate="!is_ultimate"
            hide-ultimate-badge
            @upgrade="upgrade_dialog_open = true"
          >
            <template #bottom-action>
              <input
                v-model="m_interface_settings.embed_style.author_url"
                placeholder="Not set"
                type="text"
                class="grow"
                maxlength="2000"
                :disabled="!is_ultimate"
              />
            </template>
          </GroupSetting>

          <DashboardInterfaceImageSetting
            heading="Author image"
            description="A small icon shown next to the author name"
            :url="m_interface_settings.embed_style.author_icon_url"
            :default-url="DEFAULT_AUTHOR_ICON_URL"
            :disabled="!is_ultimate"
            hide-ultimate-badge
            @upgrade="upgrade_dialog_open = true"
            @preview="
              preview_image_url =
                m_interface_settings!.embed_style.author_icon_url
            "
            @choose="open_media_dialog('author_icon_url')"
            @remove="m_interface_settings!.embed_style.author_icon_url = null"
            @reset="
              m_interface_settings!.embed_style.author_icon_url =
                DEFAULT_AUTHOR_ICON_URL
            "
          />
        </div>
      </div>

      <div class="groups-wrapper">
        <div class="vertical-center gap-2">
          <span class="text-group-name">MESSAGE BODY</span>
          <Badge v-if="!is_ultimate" variant="ultimate">Ultimate</Badge>
        </div>
        <div class="groups-container">
          <GroupSetting
            heading="Title"
            description="The title of the message"
            :ultimate="!is_ultimate"
            hide-ultimate-badge
            @upgrade="upgrade_dialog_open = true"
          >
            <template #bottom-action>
              <input
                v-model="m_interface_settings.embed_style.title"
                placeholder="Not set"
                type="text"
                class="grow"
                maxlength="256"
                :disabled="!is_ultimate"
              />
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Title link"
            description="The link that opens when users click the title"
            :ultimate="!is_ultimate"
            hide-ultimate-badge
            @upgrade="upgrade_dialog_open = true"
          >
            <template #bottom-action>
              <input
                v-model="m_interface_settings.embed_style.url"
                placeholder="Not set"
                type="text"
                class="grow"
                maxlength="2000"
                :disabled="!is_ultimate"
              />
            </template>
          </GroupSetting>

          <DashboardInterfaceImageSetting
            heading="Thumbnail"
            description="A small image shown on the top right of the message"
            :url="m_interface_settings.embed_style.thumbnail"
            :disabled="!is_ultimate"
            hide-ultimate-badge
            @upgrade="upgrade_dialog_open = true"
            @preview="
              preview_image_url = m_interface_settings!.embed_style.thumbnail
            "
            @choose="open_media_dialog('thumbnail')"
            @remove="m_interface_settings!.embed_style.thumbnail = null"
          />

          <GroupSetting
            heading="Description"
            description="The main text of the message"
            :ultimate="!is_ultimate"
            hide-ultimate-badge
            @upgrade="upgrade_dialog_open = true"
          >
            <template #bottom-action>
              <textarea
                v-model="m_interface_settings.embed_style.description"
                placeholder="Not set"
                class="min-h-32 grow resize-y"
                maxlength="4000"
                :disabled="!is_ultimate"
              />
            </template>
          </GroupSetting>

          <DashboardInterfaceImageSetting
            heading="Image"
            description="A large image shown below the description"
            :url="m_interface_settings.embed_style.image"
            :default-url="DEFAULT_IMAGE_URL"
            :disabled="!is_ultimate"
            hide-ultimate-badge
            @upgrade="upgrade_dialog_open = true"
            @preview="
              preview_image_url = m_interface_settings!.embed_style.image
            "
            @choose="open_media_dialog('image')"
            @remove="m_interface_settings!.embed_style.image = null"
            @reset="m_interface_settings!.embed_style.image = DEFAULT_IMAGE_URL"
          />
        </div>
      </div>

      <div class="groups-wrapper">
        <div class="vertical-center gap-2">
          <span class="text-group-name">MESSAGE FOOTER</span>
          <Badge v-if="!is_ultimate" variant="ultimate">Ultimate</Badge>
        </div>
        <div class="groups-container">
          <GroupSetting
            heading="Footer"
            description="The text shown at the bottom of the message"
            :ultimate="!is_ultimate"
            hide-ultimate-badge
            @upgrade="upgrade_dialog_open = true"
          >
            <template #bottom-action>
              <input
                v-model="m_interface_settings.embed_style.footer"
                placeholder="Not set"
                type="text"
                class="grow"
                maxlength="2048"
                :disabled="!is_ultimate"
              />
            </template>
          </GroupSetting>

          <DashboardInterfaceImageSetting
            heading="Footer image"
            description="A small icon shown next to the footer text"
            :url="m_interface_settings.embed_style.footer_icon_url"
            :disabled="!is_ultimate"
            hide-ultimate-badge
            @upgrade="upgrade_dialog_open = true"
            @preview="
              preview_image_url =
                m_interface_settings!.embed_style.footer_icon_url
            "
            @choose="open_media_dialog('footer_icon_url')"
            @remove="m_interface_settings!.embed_style.footer_icon_url = null"
          />

          <div class="groups-container-compact">
            <GroupSetting
              heading="Color"
              description="The color of the line on the left of the message"
              :ultimate="!is_ultimate"
              hide-ultimate-badge
              compact
              class="w-80 max-w-80"
              @upgrade="upgrade_dialog_open = true"
            >
              <template #bottom-action>
                <input
                  v-model="color_hex"
                  type="color"
                  class="h-9 w-full"
                  :disabled="!is_ultimate"
                />
              </template>
            </GroupSetting>

            <GroupSetting
              heading="Timestamp"
              description="A fixed date and time shown in the message"
              :ultimate="!is_ultimate"
              hide-ultimate-badge
              compact
              class="w-80 max-w-80"
              @upgrade="upgrade_dialog_open = true"
            >
              <template #bottom-action>
                <div class="flex gap-2">
                  <input
                    v-model="timestamp_local"
                    type="datetime-local"
                    class="min-w-0 grow"
                    :disabled="!is_ultimate"
                  />
                  <ButtonSecondary
                    v-if="timestamp_local"
                    :disabled="!is_ultimate"
                    @click="timestamp_local = ''"
                  >
                    Clear
                  </ButtonSecondary>
                </div>
              </template>
            </GroupSetting>
          </div>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">BUTTONS LAYOUT</span>
        <GroupSetting
          heading="Buttons"
          description="Click a button to edit it, or an empty slot to add one"
        >
          <template #bottom-action>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="cell in button_grid"
                :key="`${cell.row}-${cell.col}`"
                type="button"
                class="flex h-10 min-w-0 items-center justify-center gap-1.5 rounded px-1.5 text-sm transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-pink-500/80 focus-visible:outline-none"
                :class="
                  cell.button
                    ? [
                        'text-white',
                        button_style_classes[cell.button.button_style_key] ??
                          button_style_classes[2],
                        cell.button.button_disabled && 'opacity-50',
                      ]
                    : 'bordered border-dashed text-dimmed'
                "
                :aria-label="`Row ${cell.row + 1}, position ${cell.col + 1}: ${button_label(cell.button?.id)}`"
                @click="open_slot(cell.row, cell.col)"
              >
                <template v-if="cell.button">
                  <img
                    v-if="emoji_url(cell.button.emoji, 32)"
                    :src="emoji_url(cell.button.emoji, 32)!"
                    alt=""
                    class="size-5 shrink-0"
                  />
                  <span v-else-if="cell.button.emoji" class="shrink-0">{{
                    cell.button.emoji
                  }}</span>
                  <span
                    v-if="cell.button.name || !cell.button.emoji"
                    class="min-w-0 truncate"
                    >{{
                      cell.button.name || button_label(cell.button.id)
                    }}</span
                  >
                </template>
                <Icon v-else name="fluent:add-12-regular" />
              </button>
            </div>
          </template>
        </GroupSetting>
      </div>
    </div>

    <div
      v-else-if="guild_settings_error"
      class="center text-foreground-destructive"
    >
      Something went wrong, please try again later
    </div>
    <div v-else class="center">
      <IconLoading />
    </div>

    <Dialog
      :open="selected_slot != null"
      @update:open="(o) => !o && (selected_slot = null)"
    >
      <DialogContent v-if="selected_slot">
        <div class="flex flex-col gap-2">
          <p class="text-center text-xl">
            Row {{ selected_slot.row + 1 }} - Position
            {{ selected_slot.col + 1 }}
          </p>

          <div class="mt-4 flex max-h-[70vh] flex-col gap-6 overflow-y-auto">
            <div class="groups-wrapper">
              <span class="text-group-name">BEHAVIOR</span>
              <div class="groups-container">
                <GroupSetting
                  heading="Button"
                  description="The button shown in this position, a button already used in another position can't be selected"
                  :ultimate="!is_ultimate"
                  @upgrade="
                    () => {
                      selected_slot = null
                      upgrade_dialog_open = true
                    }
                  "
                >
                  <template #bottom-action>
                    <Select
                      :model-value="selected_button?.id ?? 'none'"
                      :disabled="!is_ultimate"
                      @update:model-value="
                        (id) =>
                          set_slot_button(
                            selected_slot!.row,
                            selected_slot!.col,
                            id as string,
                          )
                      "
                    >
                      <SelectTrigger>
                        <SelectValue aria-label="value">{{
                          button_label(selected_button?.id)
                        }}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            v-for="id in slot_options(
                              selected_slot.row,
                              selected_slot.col,
                            )"
                            :key="id"
                            :value="id"
                          >
                            {{ button_label(id) }}
                          </SelectItem>
                          <SelectItem value="none">No button</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </template>
                </GroupSetting>
                <GroupSetting
                  v-if="selected_button"
                  heading="Disabled"
                  description="Users can see the button but can't click it"
                >
                  <Switch v-model:checked="selected_button.button_disabled" />
                </GroupSetting>
              </div>
            </div>

            <div v-if="selected_button" class="groups-wrapper">
              <div class="vertical-center gap-2">
                <span class="text-group-name">APPEARANCE</span>
                <Badge v-if="!is_ultimate" variant="ultimate">Ultimate</Badge>
              </div>
              <div class="groups-container">
                <GroupSetting
                  heading="Name"
                  description="The text shown on the button, a button needs a name or an emoji to be shown"
                  :ultimate="!is_ultimate"
                  hide-ultimate-badge
                  @upgrade="
                    () => {
                      selected_slot = null
                      upgrade_dialog_open = true
                    }
                  "
                >
                  <template #bottom-action>
                    <input
                      v-model="selected_button.name"
                      :disabled="!is_ultimate"
                      placeholder="Not set"
                      type="text"
                      class="grow"
                      maxlength="80"
                    />
                  </template>
                </GroupSetting>

                <GroupSetting
                  heading="Emoji"
                  description="A standard emoji, or the code of a custom Discord emoji"
                  :ultimate="!is_ultimate"
                  hide-ultimate-badge
                  @upgrade="
                    () => {
                      selected_slot = null
                      upgrade_dialog_open = true
                    }
                  "
                >
                  <template #heading-action>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <ButtonText aria-label="How to use custom emojis">
                          <IconQuestion class="size-5" />
                        </ButtonText>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle
                            >Using custom emojis</AlertDialogTitle
                          >
                          <AlertDialogDescription class="flex flex-col gap-2">
                            <span>
                              To insert a custom Discord emoji, go on Discord,
                              write the emoji prefixed with a backslash (for
                              example {{ '\\:name:' }}) and send the message.
                            </span>
                            <span>
                              Discord will send the emoji code in the channel,
                              like &lt;:name:id&gt; or &lt;a:name:id&gt; for
                              animated emojis. Copy it and paste it here in the
                              editor, it will then be rendered on Discord.
                            </span>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Close</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </template>
                  <template #bottom-action>
                    <div class="flex items-center gap-2">
                      <input
                        v-model="selected_button.emoji"
                        :disabled="!is_ultimate"
                        placeholder="Not set"
                        type="text"
                        class="min-w-0 grow"
                      />
                      <img
                        v-if="emoji_url(selected_button.emoji, 48)"
                        :src="emoji_url(selected_button.emoji, 48)!"
                        alt=""
                        class="size-8 shrink-0"
                      />
                      <span
                        v-else-if="selected_button.emoji"
                        class="text-2xl"
                        >{{ selected_button.emoji }}</span
                      >
                    </div>
                  </template>
                </GroupSetting>
                <GroupSetting
                  heading="Style"
                  description="The color of the button"
                  :ultimate="!is_ultimate"
                  hide-ultimate-badge
                  @upgrade="
                    () => {
                      selected_slot = null
                      upgrade_dialog_open = true
                    }
                  "
                >
                  <template #bottom-action>
                    <Select
                      :model-value="String(selected_button.button_style_key)"
                      :disabled="!is_ultimate"
                      @update:model-value="
                        (key) =>
                          (selected_button!.button_style_key = Number(key))
                      "
                    >
                      <SelectTrigger>
                        <SelectValue aria-label="value">{{
                          button_styles.find(
                            (s) => s.key == selected_button!.button_style_key,
                          )?.name
                        }}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            v-for="style in button_styles"
                            :key="style.key"
                            :value="String(style.key)"
                          >
                            {{ style.name }}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </template>
                </GroupSetting>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <DashboardMediaDialog
      v-model:open="media_dialog_open"
      type="INTERFACE_IMAGE"
      @select="on_media_select"
      @deleted="on_media_deleted"
    />

    <AlertDialog
      :open="preview_image_url != null"
      @update:open="(o) => !o && (preview_image_url = null)"
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle class="truncate">{{
            preview_image_url ? image_name(preview_image_url) : ''
          }}</AlertDialogTitle>
        </AlertDialogHeader>
        <img
          v-if="preview_image_url"
          :src="preview_image_url"
          :alt="image_name(preview_image_url)"
          class="max-h-96 w-full rounded object-contain"
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

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

<script setup lang="ts">
import { navigateTo } from '#imports'
import { h } from 'vue'
import useClone from '~/composables/useClone'
import isGuildUltimate from '~/utils/isGuildUltimate'
import { AError, AErrorCode } from '~/data/astro/core/AError'
import { deepEqual } from 'fast-equals'
import type {
  GSInterface,
  GSInterfaceButton,
} from '~/types/guild-settings/interface'
import type { GuildSettings } from '~/types/guild-settings/guild_settings'
import type { Media } from '~/types/media'
import { useToast } from '~/components/ui/toast'
import { Select, SelectItem } from '~/components/ui/select'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

useHead({
  title: 'Interface - Astro - Temporary Voice Channels for your Discord!',
  meta: [
    {
      name: 'description',
      content: 'Edit the message and buttons of your interface',
    },
    {
      property: 'og:title',
      content: 'Interface - Astro - Temporary Voice Channels for your Discord!',
    },
    {
      property: 'og:description',
      content: 'Edit the message and buttons of your interface',
    },
    { property: 'og:url', content: 'https://astro-bot.space/guilds/interface' },
  ],
})

const DEFAULT_AUTHOR_ICON_URL =
  'https://cdn.discordapp.com/avatars/715621848489918495/dc0affdf8de07a3d88c4d192efad649f.png?size=2048'
const DEFAULT_IMAGE_URL = 'https://astro-bot.space/new-interface-image.png'

const { toast } = useToast()
const route = useRoute()
const guild_id = useGuildId()
const interface_id = ref(route.params.interface_id as string | undefined)

watch(
  () => route.params,
  (params) => {
    interface_id.value = params.interface_id as string | undefined
  },
)

const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_settings, error: guild_settings_error } =
  useGuildSettings(guild_id)

const interface_settings = computed<GSInterface | undefined>(() =>
  guild_settings.value?.interfaces?.find(
    (i) => i.message_id == interface_id.value,
  ),
)

const upgrade_dialog_open = ref(false)
const is_ultimate = computed(() => {
  if (guild_settings.value) {
    return isGuildUltimate(guild_settings.value)
  } else {
    return false
  }
})

const move_dialog_open = ref(false)
const move_channel_id = ref('')

const m_interface_settings = ref<GSInterface | undefined>(undefined)
const interface_settings_edited = ref(false)

watch(
  interface_settings,
  (new_interface_settings) => {
    if (new_interface_settings) {
      m_interface_settings.value = useClone(new_interface_settings)
    }
  },
  { deep: true, immediate: true },
)

watch(
  m_interface_settings,
  (new_m_interface_settings) => {
    if (!interface_settings.value || !new_m_interface_settings) {
      interface_settings_edited.value = false
    } else {
      interface_settings_edited.value = !deepEqual(
        new_m_interface_settings,
        interface_settings.value,
      )
    }
  },
  { deep: true, immediate: true },
)

/// EMBED ///
type ImageField = 'thumbnail' | 'image' | 'author_icon_url' | 'footer_icon_url'

const color_hex = computed({
  get() {
    return `#${((m_interface_settings.value?.embed_style.color ?? 0) & 0xffffff).toString(16).padStart(6, '0')}`
  },
  set(value) {
    if (m_interface_settings.value) {
      m_interface_settings.value.embed_style.color = parseInt(
        value.slice(1),
        16,
      )
    }
  },
})

const timestamp_local = computed({
  get() {
    const timestamp = m_interface_settings.value?.embed_style.timestamp
    if (timestamp == null) return ''
    // datetime-local expects the local time
    return new Date(timestamp - new Date(timestamp).getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16)
  },
  set(value) {
    if (m_interface_settings.value) {
      m_interface_settings.value.embed_style.timestamp = value
        ? new Date(value).getTime()
        : null
    }
  },
})

/// IMAGES ///
const media_dialog_open = ref(false)
const media_dialog_field = ref<ImageField | undefined>(undefined)
const preview_image_url = ref<string | null>(null)

const { data: guild_media } = useGuildMedia(guild_id)

const image_name = (url: string) =>
  guild_media.value?.find((m) => m.url == url)?.file_name ??
  decodeURIComponent(url.split('?')[0]!.split('/').pop() ?? url)

function open_media_dialog(field: ImageField) {
  media_dialog_field.value = field
  media_dialog_open.value = true
}

function on_media_select(media: Media) {
  if (m_interface_settings.value && media_dialog_field.value) {
    m_interface_settings.value.embed_style[media_dialog_field.value] = media.url
  }
  media_dialog_open.value = false
}

function on_media_deleted(media: Media) {
  if (!m_interface_settings.value) return

  const image_fields: ImageField[] = [
    'thumbnail',
    'image',
    'author_icon_url',
    'footer_icon_url',
  ]

  for (const field of image_fields) {
    if (m_interface_settings.value.embed_style[field] == media.url) {
      m_interface_settings.value.embed_style[field] = null
    }
  }
}

/// BUTTONS ///
const button_styles = [
  { key: 1, name: 'Blurple' },
  { key: 2, name: 'Grey' },
  { key: 3, name: 'Green' },
  { key: 4, name: 'Red' },
]

// the buttons the bot knows how to handle, with the emoji used when adding one
const button_catalog = [
  { id: 'button/vc/lock', name: 'Lock', emoji: '<:lock:1029831342575325225>' },
  {
    id: 'button/vc/unlock',
    name: 'Unlock',
    emoji: '<:unlock:1029831345884647554>',
  },
  { id: 'button/vc/hide', name: 'Hide', emoji: '<:hide:1029831340595626056>' },
  {
    id: 'button/vc/unhide',
    name: 'Unhide',
    emoji: '<:unhide:1029831344278220833>',
  },
  {
    id: 'button/vc/limit',
    name: 'User limit',
    emoji: '<:limit:1029823585801478154>',
  },
  {
    id: 'button/vc/invite',
    name: 'Invite',
    emoji: '<:invite:1029823584287338496>',
  },
  { id: 'button/vc/ban', name: 'Ban', emoji: '<:ban:1029823553077510327>' },
  {
    id: 'button/vc/permit',
    name: 'Permit',
    emoji: '<:permit:1029823602071191563>',
  },
  { id: 'button/vc/name', name: 'Name', emoji: '<:name:1029823591329579039>' },
  {
    id: 'button/vc/bitrate',
    name: 'Bitrate',
    emoji: '<:bitrate:1029823554574884997>',
  },
  {
    id: 'button/vc/region',
    name: 'Region',
    emoji: '<:region:1029823605346930809>',
  },
  {
    id: 'button/vc/template',
    name: 'Template',
    emoji: '<:template:1038794746249875567>',
  },
  { id: 'button/vc/chat', name: 'Chat', emoji: '<:chat:1029823561063464960>' },
  {
    id: 'button/vc/waiting-room',
    name: 'Waiting room',
    emoji: '<:waiting:1146421350819450920>',
  },
  {
    id: 'button/vc/claim',
    name: 'Claim',
    emoji: '<:owner:1030227494630076448>',
  },
  {
    id: 'button/vc/transfer',
    name: 'Transfer ownership',
    emoji: '<:transfer_owner:1030227495892557826>',
  },
]

// buttons removed from a slot, so that they get their customizations back if re-added
const removed_buttons = new Map<string, GSInterfaceButton>()

const button_label = (id: string | undefined) =>
  id ? (button_catalog.find((b) => b.id == id)?.name ?? id) : 'No button'

const button_at = (row: number, col: number) =>
  m_interface_settings.value?.buttons.find(
    (b) => b.position.first == row && b.position.second == col,
  )

const button_style_classes: Record<number, string> = {
  1: 'bg-[#5865f2]',
  2: 'bg-[#4e5058]',
  3: 'bg-[#248046]',
  4: 'bg-[#da373c]',
}

const button_grid = computed(() =>
  Array.from({ length: 25 }, (_, i) => ({
    row: Math.floor(i / 5),
    col: i % 5,
    button: button_at(Math.floor(i / 5), i % 5),
  })),
)

const selected_slot = ref<{ row: number; col: number } | null>(null)
const selected_button = computed(() =>
  selected_slot.value
    ? button_at(selected_slot.value.row, selected_slot.value.col)
    : undefined,
)

function open_slot(row: number, col: number) {
  // adding a button to an empty slot is part of the Ultimate layout
  if (!is_ultimate.value && !button_at(row, col)) {
    upgrade_dialog_open.value = true
  } else {
    selected_slot.value = { row, col }
  }
}

// custom emojis are rendered from the Discord cdn, standard ones are text
function emoji_url(emoji: string | null, size: number) {
  const match = emoji?.trim().match(/^<(a?):\w+:(\d+)>$/)
  return match
    ? `https://cdn.discordapp.com/emojis/${match[2]}.${match[1] ? 'gif' : 'webp'}?size=${size}`
    : null
}

// buttons already in another slot are not selectable
function slot_options(row: number, col: number) {
  const current_id = button_at(row, col)?.id
  const used_ids = new Set(m_interface_settings.value?.buttons.map((b) => b.id))

  return [...new Set([...button_catalog.map((b) => b.id), ...used_ids])].filter(
    (id) => !used_ids.has(id) || id == current_id,
  )
}

function set_slot_button(row: number, col: number, id: string) {
  if (!m_interface_settings.value) return

  const current = button_at(row, col)
  if (current) {
    removed_buttons.set(current.id, useClone(current))
    m_interface_settings.value.buttons =
      m_interface_settings.value.buttons.filter((b) => b.id != current.id)
  }

  if (id != 'none') {
    m_interface_settings.value.buttons.push({
      ...(removed_buttons.get(id) ?? {
        id,
        field_value: id,
        name: null,
        emoji: button_catalog.find((b) => b.id == id)?.emoji ?? null,
        button_style_key: 2,
        button_disabled: false,
      }),
      position: { first: row, second: col },
    })
  }
}

/// MUTATIONS ///
const {
  mutate: update_interface,
  isPending: update_interface_pending,
  error: update_interface_error,
} = useUpdateInterfaceMutation()
const { mutate: upgrade_guild, error: upgrade_guild_error } =
  useGuildUpgradeMutation()
const {
  mutate: move_interface,
  isPending: move_interface_loading,
  error: move_interface_error,
} = useMoveInterfaceMutation()
const {
  mutate: delete_interface,
  isPending: delete_interface_loading,
  error: delete_interface_error,
  isSuccess: delete_interface_success,
} = useDeleteInterfaceMutation()

/// SUCCESS ACTIONS ///
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

watch(delete_interface_success, (s) => {
  if (s) {
    navigateTo(`/guilds/${guild_id.value}/interfaces`)
  }
})

function on_interface_updated() {
  const path = `${guild_id.value}/${interface_settings.value?.channel_id}/${interface_id.value}`

  toast({
    duration: 6000,
    description: h('div', [
      'The interface has been updated',
      h('br'),
      h(
        'a',
        {
          href: `https://discord.com/channels/${path}`,
          target: '_blank',
          rel: 'noopener noreferrer',
          class: 'text-foreground-link-standout hover:opacity-80',
        },
        'Open in Discord',
      ),
    ]),
  })
}

// the moved interface is a new message, so it has a new id
function open_move_dialog() {
  move_channel_id.value = interface_settings.value?.channel_id ?? ''
  move_dialog_open.value = true
}

function on_move_interface() {
  // the index has to be read before the settings are updated with the move
  const index =
    guild_settings.value?.interfaces.findIndex(
      (i) => i.message_id == interface_id.value,
    ) ?? -1

  move_interface(
    {
      guild_id: guild_id.value!,
      interface_id: interface_id.value!,
      channel_id: move_channel_id.value,
    },
    { onSuccess: (data) => on_interface_moved(data, index) },
  )
}

function on_interface_moved(data: GuildSettings, index: number) {
  move_dialog_open.value = false

  // the moved interface replaces the old one at the same position
  const moved = data.interfaces[index]
  if (moved) {
    navigateTo(`/guilds/${guild_id.value}/interfaces/${moved.message_id}`)
  }
}

/// ERROR TOASTS ///
watch(move_interface_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(delete_interface_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(update_interface_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})
</script>
