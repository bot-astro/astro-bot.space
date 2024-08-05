<template>
  <div class="w-full">
    <NuxtLoadingIndicator />
    <div class="flex w-full text-sm">
      <DashboardSidebar class="fixed hidden overflow-hidden h-[100dvh] w-[250px] md:flex"/>

      <DashboardSidebar
        :class="cn(
          mobile_sidebar_open ? 'flex' : 'hidden',
           'fixed md:hidden z-40'
         )"
      />
      <div
        @click="mobile_sidebar_open = false"
        :class="cn(
          mobile_sidebar_open ? 'flex' : 'hidden',
          'fixed md:hidden inset-0 z-30 bg-black/80'
        )"
      />

      <DashboardSidebarMobile
        :class="cn(
          mobile_sidebar_open ? 'invisible' : 'visible',
          'fixed flex md:hidden overflow-hidden h-[100dvh] w-[50px]'
          )"
        @onExpand="mobile_sidebar_open = true"
      />


      <div class="flex w-full">
        <DashboardNavbar class="fixed ml-[50px] md:ml-[250px] min-h-16 md:min-h-20 z-20 w-[calc(100%-50px)] md:w-[calc(100%-250px)]" />

        <div class="mt-16 flex min-h-screen w-full flex-col pl-[50px] md:pl-[250px] md:mt-20">
          <div class="p-8 h-full">
            <slot />
          </div>
          <CoreFooter class="mt-auto"/>
        </div>
      </div>
    </div>
    <CoreModal />
  </div>
</template>

<script setup lang="ts">
const mobile_sidebar_open = ref(false);
</script>
