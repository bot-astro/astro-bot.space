<template>
  <Dialog v-model:open="open">
    <DialogContent class="max-w-3xl">
      <div class="flex flex-col gap-2">
        <p class="text-center text-xl">{{ $t('dashboard.media.title') }}</p>
        <p class="text-center text-foreground-secondary">
          {{ $t('dashboard.media.description') }}
        </p>
      </div>

      <input
        ref="file_input"
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        class="hidden"
        @change="on_file_selected"
      />

      <template v-if="media">
        <div v-if="filtered_media.length > 0" class="flex justify-end">
          <Button :loading="upload_media_loading" @click="file_input?.click()">
            <Icon name="fluent:add-12-regular" />
            {{ $t('common.upload') }}
          </Button>
        </div>

        <div
          v-if="filtered_media.length > 0"
          class="grid max-h-112 grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3"
        >
          <div
            v-for="m in filtered_media"
            :key="m.id"
            class="group-setting flex flex-col gap-2 p-2!"
          >
            <div class="relative">
              <img
                :src="m.url"
                :alt="m.file_name"
                loading="lazy"
                draggable="false"
                class="aspect-video w-full rounded bg-background object-cover select-none"
              />
              <AlertDialog>
                <AlertDialogTrigger class="absolute top-1 right-1">
                  <ButtonDestructive
                    :loading="delete_media_loading"
                    :aria-label="$t('dashboard.media.delete_image')"
                    class="bg-background px-2"
                  >
                    <Icon name="fluent:delete-24-regular" />
                  </ButtonDestructive>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{{
                      $t('dashboard.media.delete_confirm_title')
                    }}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {{ $t('dashboard.media.delete_confirm_description') }}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{{
                      $t('common.go_back')
                    }}</AlertDialogCancel>
                    <AlertDialogAction
                      :destructive="true"
                      @click="
                        delete_media(
                          { guild_id: guild_id!, media_id: m.id },
                          { onSuccess: () => $emit('deleted', m) },
                        )
                      "
                    >
                      {{ $t('common.delete') }}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <span class="truncate text-center text-sm" :title="m.file_name">{{
              m.file_name
            }}</span>
            <ButtonSecondary
              class="w-full justify-center"
              @click="$emit('select', m)"
            >
              {{ $t('common.select') }}
            </ButtonSecondary>
          </div>
        </div>

        <button
          v-else
          type="button"
          class="center flex-col gap-2 rounded-md border-2 border-dashed border-border px-4 py-12 text-foreground-secondary transition-colors hover:border-gray-400"
          :class="{ 'border-gray-400': dragging }"
          :disabled="upload_media_loading"
          @click="file_input?.click()"
          @dragover.prevent="dragging = true"
          @dragleave="dragging = false"
          @drop.prevent="
            (event: DragEvent) => {
              dragging = false
              const file = event.dataTransfer?.files?.[0]
              if (file && guild_id) {
                upload_media({ guild_id, type: props.type, file })
              }
            }
          "
        >
          <IconLoading v-if="upload_media_loading" />
          <Icon v-else name="fluent:image-add-24-regular" class="size-8" />
          <span>{{ $t('dashboard.media.drop_or_click') }}</span>
        </button>
      </template>
      <div v-else-if="media_error" class="center text-foreground-destructive">
        {{ $t('common.error_generic') }}
      </div>
      <div v-else class="center py-6">
        <IconLoading />
      </div>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { useToast } from '~/components/ui/toast'
import type { Media, MediaType } from '~/types/media'

const props = defineProps<{ type: MediaType }>()
const open = defineModel<boolean>('open', { required: true })
defineEmits<{ select: [Media]; deleted: [Media] }>()

const { toast } = useToast()
const guild_id = useGuildId()
const { data: media, error: media_error } = useGuildMedia(guild_id)
const {
  mutate: upload_media,
  isPending: upload_media_loading,
  error: upload_media_error,
} = useUploadMediaMutation()
const {
  mutate: delete_media,
  isPending: delete_media_loading,
  error: delete_media_error,
} = useDeleteMediaMutation()

const file_input = ref<HTMLInputElement | null>(null)
const dragging = ref(false)

const filtered_media = computed(
  () => media.value?.filter((m) => m.type == props.type) ?? [],
)

function on_file_selected(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file && guild_id.value) {
    upload_media({ guild_id: guild_id.value, type: props.type, file })
  }
  // allows uploading the same file again
  input.value = ''
}

watch(upload_media_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})

watch(delete_media_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive',
    })
  }
})
</script>
