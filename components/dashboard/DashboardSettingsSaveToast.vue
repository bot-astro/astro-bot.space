<template>
  <Transition>
    <div v-show="edited" class="min-w-full fixed flex justify-center bottom-0 z-30 p-4">
      <div class="group h-min flex items-center justify-between text-sm shadow-xl w-full md:w-1/2">
        <span>You have unsaved changes</span>
        <Button @click="dashboard.save()" :loading="loading">
          Save changes
        </Button>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const dashboard = useDashboardStore()

const { edited, loading } = storeToRefs(dashboard)
</script>
