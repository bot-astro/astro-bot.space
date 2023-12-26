<template>
  <div></div>
</template>

<script lang="ts" setup>
const route = useRoute();
const config = useRuntimeConfig()
const authStore = useAuthStore();
const isError = ref(false);

onMounted(async () => {
  const previousRoute = sessionStorage.getItem("auth-previous-route") ?? "/";
  const oauthCode = route.query.code?.toString;

  if (oauthCode == null) {
    isError.value = true;
    return;
  }

  const { data, error } = await useFetch<AuthData>(`${config.public.apiBaseUrl}/auth/id/${oauthCode}`)

  if (data.value != null) {
    authStore.set(data.value);
    navigateTo(previousRoute, { replace: true });
  } else if (error.value != null) {
    isError.value = true
    console.log(error.value)
  }
});
</script>

<style></style>
