<script setup lang="ts"></script>

<template>
  <div
    class="w-full border-t border-neutral-800 px-4 pt-12 pb-4 bg-neutral-950"
  >
    <!-- footer links section -->
    <div class="my-6 flex flex-wrap justify-between gap-12 sm:justify-around">
      <div class="flex flex-col gap-y-4">
        <p>
          Resources
        </p>
        <div class="flex flex-col gap-y-3 text-sm">
          <NuxtLink to="/support">
            Support
          </NuxtLink>
          <NuxtLink to="/ultimate">
            Ultimate
          </NuxtLink>
          <NuxtLink to="/status">
            Status
          </NuxtLink>
        </div>
      </div>
      <div class="flex flex-col gap-y-4">
        <p>
          Company
        </p>
        <div class="flex flex-col gap-y-3 text-sm">
          <NuxtLink to="/">
            Home
          </NuxtLink>
          <a href="mailto:hi@astro-bot.space"> Contact us </a>
        </div>
      </div>
      <div class="flex flex-col gap-y-4">
        <p>
          Legal
        </p>
        <div class="flex flex-col gap-y-3 text-sm">
          <NuxtLink to="/privacy">
            Privacy policy
          </NuxtLink>
          <NuxtLink to="/terms">
            Terms of Service
          </NuxtLink>
          <NuxtLink href="/refund-policy">
            Refund policy
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- footer socials and developed by text -->
    <div class="mt-12 flex flex-col items-center justify-between sm:flex-row">
      <span class="mb-2 text-center text-sm text-secondary sm:mb-0">
        @ Astro Bot 2024 - All rights reserved
      </span>
      <div class="flex items-center text-sm">
        <Icon
          name="fluent:code-16-filled"
          class="size-5"
        />
        &nbsp;by&nbsp;<a
          href="https://giuliopime.dev"
          target="_blank"
          class="text-purple-400"
        >Giuliopime</a>
      </div>
    </div>
  </div>
</template>
