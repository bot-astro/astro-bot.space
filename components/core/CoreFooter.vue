<script setup lang="ts"></script>

<template>
  <div
    class="w-full border-t border-neutral-800 bg-neutral-950 px-4 pb-4 pt-12"
  >
    <!-- footer links section -->
    <div class="flex justify-between sm:justify-around flex-wrap gap-12 my-6">
      <div class="flex flex-col gap-y-4">
        <p>
          Resources
        </p>
        <div class="flex flex-col gap-y-3 text-sm">
          <NuxtLink to="/support">
            Support
          </NuxtLink>
          <NuxtLink to="/premium">
            Premium
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
    <div class="mt-12 flex items-center justify-between">
      <span class="text-sm text-secondary">
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
