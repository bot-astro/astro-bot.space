<template>
  <div class="flex min-h-screen items-center justify-center">
    <UtilCircularLoading />
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

onMounted(() => {
  navigateTo(config.public.supportUrl, { replace: true, external: true })
});
</script>
