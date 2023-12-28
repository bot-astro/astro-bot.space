<template>
  <div class="flex min-h-screen items-center justify-center">
    <UtilCircularLoading />
  </div>
</template>

<script lang="ts" setup>
onMounted(() => {
  navigateTo("https://github.com/bot-astro", { replace: true, external: true });
});
</script>
