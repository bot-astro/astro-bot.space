<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import {VueQueryDevtools} from "@tanstack/vue-query-devtools";
</script>