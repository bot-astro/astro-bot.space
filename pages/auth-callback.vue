<template>
  <div></div>
</template>

<script lang="ts" setup>
const route = useRoute();
const isError = ref(false);

onMounted(() => {
  const previousRoute =
    sessionStorage.getItem(authSessionStorageKeys.authPreviousRoute) ?? "/";
  const oauthCode = route.query.code?.toString;

  if (oauthCode == undefined) {
    isError.value = true;
    return;
  }

  const authData = useApiFetch<AuthData>(`auth/id/${oauthCode}`);

  authStore.set(authData);

  navigateTo(previousRoute, { replace: true });
});
</script>

<style></style>
