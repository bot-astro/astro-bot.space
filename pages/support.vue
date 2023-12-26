<template>
  <div class="flex w-full h-full items-center justify-center">
    <UtilCircularLoading :size="48" />
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

onMounted(() => {
  navigateTo(config.public.supportUrl, { replace: true, external: true })
});
</script>
