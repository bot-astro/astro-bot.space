<template>
  <div></div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const route = useRoute();

onMounted(() => {
  sessionStorage.setItem(
    "auth-previous-route",
    route.redirectedFrom?.fullPath ?? "/",
  );

  navigateTo(config.public.oauthUrl, { replace: true, external: true });
});
</script>

<style></style>
