<template>
  <div>
    Generator {{ generator_id }}
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const route = useRoute()
const guild_id = useGuildId()
const generator_id = ref(route.params.generator_id as string | undefined)

watch(() => route.params, (params) => {
  generator_id.value = params.generator_id as string | undefined
})


</script>