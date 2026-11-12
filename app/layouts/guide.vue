<template>
  <div class="background-guide">
    <NuxtLoadingIndicator />
    <div class="min-h-screen w-full">
      <CoreNavigation />
      <div
        class="flex w-full items-center justify-center prose-a:text-foreground-link-standout prose-a:no-underline hover:prose-a:opacity-80 prose-code:rounded prose-code:bordered prose-code:bg-background-container prose-code:p-1 prose-code:font-normal prose-code:before:hidden prose-code:after:hidden prose-table:bordered prose-table:bg-background-container prose-th:p-2 prose-td:p-2"
      >
        <main
          class="mt-20 flex min-h-screen w-full flex-col items-center px-4 md:mt-32"
        >
          <div class="prose prose-invert">
            <slot />
          </div>
        </main>
      </div>
    </div>

    <CoreFooter class="mt-32" />
  </div>
</template>
