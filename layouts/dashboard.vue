<template>
  <div>
    <NuxtLoadingIndicator />
    <div class="flex text-sm w-full h-screen">
      <DashboardSidebar />
      <div class="flex flex-col w-full h-full">
        <DashboardNavbar />
        <div class="flex flex-col grow">
          <slot />
          <CoreFooter class="mt-auto" />
        </div>
      </div>
    </div>
    <DashboardSettingsSaveToast />
  </div>
</template>
