<script lang="ts" setup>
const config = useRuntimeConfig();

onMounted(() => {
  navigateTo(config.public.premiumUrl, { replace: true, external: true });
});
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <UtilCircularLoading />
  </div>
</template>
