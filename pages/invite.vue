<template>
  <div />
</template>

<script lang="ts" setup>
onMounted(() => {
  useInvite().invite()
})

useHead({
  title: "Invite - "
})
</script>
