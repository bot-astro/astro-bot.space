<template>
  <div class="background-guide">
    <NuxtLoadingIndicator />
    <div class="min-h-screen w-full">
      <CoreNavigation />
      <div class="flex items-center justify-center w-full prose-a:no-underline prose-a:text-foreground-link-standout hover:prose-a:opacity-80 prose-table:bg-background-container prose-table:bordered prose-th:p-2 prose-td:p-2 prose-code:bg-background-container prose-code:p-1 prose-code:rounded prose-code:font-normal prose-code:bordered prose-code:before:hidden prose-code:after:hidden">
        <main class="mt-20 flex min-h-screen w-full flex-col items-center px-4 md:mt-32">
          <div class="prose prose-invert">
            <slot />
          </div>
        </main>
      </div>
    </div>

    <CoreFooter class="mt-32" />
  </div>
</template>
<script setup lang="ts">
</script>