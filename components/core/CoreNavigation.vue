<template>
  <div class="mx-auto flex h-28 max-w-7xl gap-x-4 px-6 backdrop-blur">
    <!-- astro logo -->
    <div class="flex items-center px-2">
      <a href="/" aria-label="home" class="flex items-center">
        <img
          src="/img/logo.png"
          class="mr-4 h-16 w-16"
          alt="Astro-s logo"
          draggable="false"
        />
        <p
          class="select-none text-3xl font-bold text-purple-50 transition-colors duration-150 hover:text-purple-100"
        >
          Astro
        </p>
      </a>
    </div>

    <!-- desktop: navbar items -->
    <div
      class="hidden select-none items-center gap-6 whitespace-nowrap px-6 text-lg lg:flex xl:gap-8 xl:px-8 xl:text-xl"
    >
      <a
        href="/invite"
        class="opacity-75 transition duration-150 hover:text-purple-50 hover:opacity-100"
      >
        Invite
      </a>
      <a
        href="/premium"
        class="opacity-75 transition duration-150 hover:text-purple-50 hover:opacity-100"
      >
        Premium
      </a>
      <Menu as="div" class="relative">
        <MenuButton
          v-slot="{ open }"
          class="relative flex items-center gap-x-1 opacity-75 transition duration-150 hover:text-purple-50 hover:opacity-100"
        >
          <p>Features</p>
          <Icon
            name="fluent:chevron-down-12-regular"
            :class="[
              { 'rotate-180': open },
              'h-4 origin-center transition-transform duration-150',
            ]"
          />
        </MenuButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="scale-95 transform opacity-0"
          enter-to-class="scale-100 transform opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="scale-100 transform opacity-100"
          leave-to-class="scale-95 transform opacity-0"
        >
          <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right">
            <MenuItem>
              <a href="/temporary-voice-channels" class="block"
                >Temporary voice channels</a
              >
            </MenuItem>
            <MenuItem>
              <a href="/voice-roles" class="block">Voice roles</a>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
      <a
        href="/support"
        class="opacity-75 transition duration-150 hover:text-purple-50 hover:opacity-100"
      >
        Support
      </a>
    </div>

    <!-- mobile: spacer -->
    <div class="flex flex-grow lg:hidden" data-v-044af020=""></div>

    <!-- auth indicator -->
    <div class="flex items-center">
      <!-- desktop -->
      <div class="hidden lg:flex"></div>

      <!-- mobile -->
      <div class="flex items-center lg:hidden">
        <button
          onclick="this.classList.toggle('hamburger-opened'); this.setAttribute('aria-expanded', this.classList.contains('hamburger-opened'))"
          @click="toggleMobileNavbarOpenState"
        >
          <svg
            class="z-40 inline h-14 w-14 cursor-pointer"
            viewBox="0 0 100 100"
          >
            <path
              class="hamburger-line rounded-lg"
              id="hamburger-line-1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path
              class="hamburger-line"
              id="hamburger-line-2"
              d="M 20,50 H 80"
            />
            <path
              class="hamburger-line"
              id="hamburger-line-3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <!--
  <Disclosure as="nav" class="backdrop-blur" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center space-x-4">
            <img class="h-16 w-16" src="/img/logo.png" alt="Astro logo" />
            <a href="/" class="select-none text-3xl font-bold text-purple-50 transition-colors duration-150 hover:text-purple-100">Astro</a>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a href="/invite" class="select-none text-lg text-white opacity-75 transition duration-150 hover:text-purple-50 hover:opacity-100 xl:text-xl">Invite</a>
              <a href="/premium" class="select-none text-lg text-purple-50 opacity-75 transition duration-150 hover:text-purple-50 hover:opacity-100 xl:text-xl">Premium</a>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition duration-100 ease-out" enter-from-class="scale-95 transform opacity-0" enter-to-class="scale-100 transform opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="scale-100 transform opacity-100" leave-to-class="scale-95 transform opacity-0">
              <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your servers</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
  -->
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

let navbarOpened = ref(false);

function toggleMobileNavbarOpenState() {
  navbarOpened.value = !navbarOpened.value;
}
</script>

<style scoped>
.hamburger-line {
  fill: none;
  stroke: white;
  stroke-width: 8;
  transition:
    stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
#hamburger-line-1 {
  stroke-dasharray: 60 207;
}
#hamburger-line-2 {
  stroke-dasharray: 60 60;
}
#hamburger-line-3 {
  stroke-dasharray: 60 207;
}
.hamburger-opened #hamburger-line-1 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
}
.hamburger-opened #hamburger-line-2 {
  stroke-dasharray: 1 60;
  stroke-dashoffset: -30;
}
.hamburger-opened #hamburger-line-3 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
}
</style>
