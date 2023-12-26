<template>
  <div></div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const route = useRoute()

onMounted(() => {
  sessionStorage.setItem(
    authSessionStorageKeys.authPreviousRoute,
    route.redirectedFrom?.fullPath ?? "/"
  );

  navigateTo(config.public.oauthUrl, { replace: true })
});
</script>

<style></style>
