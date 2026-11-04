<template>
  <GroupSetting
    :heading="heading"
    :description="description"
    :ultimate="disabled"
    :hide-ultimate-badge="hideUltimateBadge"
    @upgrade="$emit('upgrade')"
  >
    <template #bottom-action>
      <div class="flex flex-wrap items-center gap-2">
        <span
          class="min-w-0 basis-full truncate sm:grow sm:basis-0"
          :class="{ 'text-dimmed': !url }"
          :title="url ? image_name : undefined"
        >
          {{
            url ? display_name : (emptyLabel ?? $t('dashboard.image.not_set'))
          }}
        </span>
        <ButtonSecondary
          v-if="defaultUrl && url !== defaultUrl"
          :disabled="disabled"
          @click="$emit('reset')"
        >
          {{ $t('dashboard.image.reset_to_default') }}
        </ButtonSecondary>
        <template v-if="url">
          <ButtonSecondary :disabled="disabled" @click="$emit('preview')">
            {{ $t('dashboard.image.preview') }}
          </ButtonSecondary>
          <ButtonSecondary :disabled="disabled" @click="$emit('choose')">
            {{ $t('dashboard.image.replace') }}
          </ButtonSecondary>
          <ButtonDestructive :disabled="disabled" @click="$emit('remove')">
            {{ $t('dashboard.image.remove') }}
          </ButtonDestructive>
        </template>
        <Button v-else :disabled="disabled" @click="$emit('choose')">
          {{ $t('dashboard.image.choose') }}
        </Button>
      </div>
    </template>
  </GroupSetting>
</template>

<script lang="ts" setup>
const props = defineProps<{
  heading: string
  description: string
  url: string | null
  defaultUrl?: string
  disabled: boolean
  hideUltimateBadge?: boolean
  emptyLabel?: string
}>()
defineEmits<{
  upgrade: []
  preview: []
  choose: []
  remove: []
  reset: []
}>()

const { data: media } = useGuildMedia(useGuildId())

// uploaded images show the name of the original file, others the name in their url
const image_name = computed(() =>
  props.url
    ? (media.value?.find((m) => m.url == props.url)?.file_name ??
      decodeURIComponent(
        props.url.split('?')[0]!.split('/').pop() ?? props.url,
      ))
    : '',
)

// keeps the start and the extension of long names visible
const display_name = computed(() =>
  image_name.value.length > 32
    ? `${image_name.value.slice(0, 18)}…${image_name.value.slice(-12)}`
    : image_name.value,
)
</script>
