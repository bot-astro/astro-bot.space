<template>
  <div></div>
</template>

<script lang="ts" setup>
onMounted(() => {
  navigateTo("https://github.com/bot-astro", { replace: true, external: true });
});
</script>
