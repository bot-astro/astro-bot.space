<template>
  <div class="w-full">
    <NuxtLoadingIndicator />
    <div class="flex w-full text-sm">
      <DashboardSidebar class="fixed hidden overflow-hidden h-[100dvh] w-[250px] md:flex"/>
<!--      <DashboardSidebar class="hidden md:flex" guilds="guilds" />-->


      <DashboardSidebar
        :class="cn(
          mobile_sidebar_open ? 'flex' : 'hidden',
           'fixed z-40'
         )"
      />
      <div
        @click="mobile_sidebar_open = false"
        :class="cn(
          mobile_sidebar_open ? 'visible' : 'invisible',
          'fixed inset-0 z-30 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
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

        <div class="mt-16 flex min-h-screen w-full flex-col ml-[50px] md:ml-[250px] md:mt-20">
          <div class="p-8">
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
