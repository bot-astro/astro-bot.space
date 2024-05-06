<script lang="ts" setup>
const guildsStore = useGuildsStore()
const { areSettingsModified, saveLoading } = storeToRefs(guildsStore)
</script>

<template>
  <Transition>
    <div v-show="areSettingsModified" class="min-w-full fixed flex justify-center bottom-0 z-30 p-4">
      <div class="group h-min flex items-center justify-between text-sm shadow-xl w-full md:w-1/2">
        <span>You have unsaved changes</span>
        <Button @click="guildsStore.saveModifiedGuildSettings" :loading="saveLoading">
          Save changes
        </Button>
      </div>
    </div>
  </Transition>
</template>
