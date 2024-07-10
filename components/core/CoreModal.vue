<template>
  <Transition>
    <div v-if="activeModal">
      <div class="h-screen w-screen bg-black opacity-50 absolute top-0 left-0" />
      <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group flex">
        <component :is="activeModal.component" :data="activeModal.data" />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const modal = useModalStore()

const { activeModal } = storeToRefs(modal)
</script>
