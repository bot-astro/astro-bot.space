<template>
  <div>
    <NuxtLoadingIndicator />
    <div class="min-h-screen w-full">
      <CoreNavigation />
      <div class="flex w-full items-center justify-center">
        <slot />
      </div>
    </div>

    <CoreFooter class="mt-32" />
  </div>
</template>
