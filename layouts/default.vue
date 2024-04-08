<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <NuxtLoadingIndicator />
  <div class="min-h-screen">
    <CoreNavigation />
    <slot />
  </div>

  <CoreFooter class="mt-32" />
</template>
