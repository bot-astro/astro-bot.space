<script setup lang="ts">
import cn from '~/utils/cn'
const mobile_sidebar_open = ref(false)
</script>

<template>
  <div class="w-full">
    <NuxtLoadingIndicator />
    <div class="flex w-full text-sm">
      <DashboardSidebar
        class="fixed hidden h-dvh w-[250px] overflow-hidden md:flex"
      />

      <DashboardSidebar
        :class="
          cn(mobile_sidebar_open ? 'flex' : 'hidden', 'fixed z-40 md:hidden')
        "
      />
      <div
        :class="
          cn(
            mobile_sidebar_open ? 'flex' : 'hidden',
            'fixed inset-0 z-30 bg-black/80 md:hidden',
          )
        "
        @click="mobile_sidebar_open = false"
      />

      <DashboardSidebarMobile
        :class="
          cn(
            mobile_sidebar_open ? 'invisible' : 'visible',
            'fixed flex h-dvh w-[50px] overflow-hidden md:hidden',
          )
        "
        @expand="mobile_sidebar_open = true"
      />

      <div class="flex w-full">
        <DashboardNavbar
          class="fixed z-20 ml-[50px] min-h-16 w-[calc(100%-50px)] md:ml-[250px] md:min-h-20 md:w-[calc(100%-250px)]"
        />

        <div
          class="mt-16 flex min-h-screen w-full flex-col pl-[50px] md:mt-20 md:pl-[250px]"
        >
          <div class="h-full p-8">
            <slot />
          </div>
          <CoreFooter class="mt-auto" />
        </div>
      </div>
    </div>
  </div>
</template>
