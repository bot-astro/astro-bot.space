<script lang="ts" setup>
import cn from '~/utils/cn'
import { useUser } from '~/data/astro/query/useUser'
import { toast } from '~/components/ui/toast'

// definePageMeta({
//   middleware: 'auth',
// })

const { t } = useI18n()

useHead(() => ({
  title: t('meta.page_title', { page: t('meta.ultimate.title') }),
  meta: [
    { name: 'description', content: t('meta.ultimate.description') },
    {
      property: 'og:title',
      content: t('meta.page_title', { page: t('meta.ultimate.title') }),
    },
    { property: 'og:description', content: t('meta.ultimate.description') },
    { property: 'og:url', content: 'https://astro-bot.space/ultimate' },
  ],
}))

const { $astroApiClient } = useNuxtApp()
useUser()

const quantity = ref(1)
const isMonthly = ref(true)

const price = computed(() => {
  if (isMonthly.value) return (quantity.value * 3.99).toFixed(2)
  else return (quantity.value * 39.99).toFixed(2)
})

function increaseQuantity() {
  quantity.value = quantity.value + 1
}

function decreaseQuantity() {
  quantity.value = quantity.value - 1
}

function subscribe() {
  try {
    const cbInstance = Chargebee.getInstance()

    cbInstance.openCheckout({
      // This function returns a promise that resolves a hosted page object.
      hostedPage: function () {
        // We will discuss on how to implement this end point in the next step.
        return $astroApiClient.get_chargebee_hosted_page_checkout(
          isMonthly.value,
          quantity.value,
        )
      },

      success: function () {
        // TODO: Open popup with success and dashboard button
        navigateTo('/guilds')
      },
    })
  } catch (e) {
    console.error(e)
    toast({
      description: t('error.checkout'),
      variant: 'destructive',
    })
  }
}
</script>

<template>
  <div class="mx-12 mt-16 flex w-3/4 flex-col items-center gap-16 md:w-auto">
    <div class="flex flex-col gap-4">
      <span class="text-title text-center">{{ $t('ultimate.title') }}</span>
      <span class="text-subtitle text-center">{{
        $t('ultimate.subtitle')
      }}</span>
    </div>

    <div class="flex flex-col rounded-lg bordered bg-background">
      <div class="flex flex-col px-12 py-8">
        <!-- purchase section -->
        <div class="flex flex-col items-center gap-8">
          <!-- settings container -->
          <div
            class="flex w-full flex-col justify-evenly gap-8 md:flex-row md:gap-24"
          >
            <!-- total -->
            <div class="flex flex-col items-center justify-center gap-2">
              <span
                class="relative text-center font-display text-6xl font-semibold"
              >
                ${{ price }}
              </span>
              <span class="text-center text-xl">{{
                $t(
                  isMonthly ? 'ultimate.per_month' : 'ultimate.per_year',
                  { count: quantity },
                  quantity,
                )
              }}</span>
            </div>
            <!-- quantity & frequency -->
            <div class="flex flex-col items-center gap-6">
              <div class="flex flex-col gap-1">
                <span class="text-center text-lg font-semibold">{{
                  $t('ultimate.server_quantity')
                }}</span>
                <div class="flex items-center justify-center gap-2">
                  <ButtonSecondary
                    class="flex aspect-square items-center justify-center rounded-lg text-center"
                    :disabled="quantity < 2"
                    @click="decreaseQuantity"
                  >
                    <Icon
                      name="fluent:line-horizontal-1-24-filled"
                      class="m-1 size-4"
                    />
                  </ButtonSecondary>
                  <span
                    class="flex w-12 items-center justify-center self-stretch rounded-lg bordered px-3 text-center select-none"
                  >
                    {{ quantity }}
                  </span>
                  <ButtonSecondary
                    class="flex aspect-square items-center justify-center rounded-lg text-center"
                    @click="increaseQuantity"
                  >
                    <Icon name="fluent:add-12-filled" class="m-1 size-4" />
                  </ButtonSecondary>
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-center text-lg font-semibold">{{
                  $t('ultimate.billed')
                }}</span>
                <div class="relative flex items-center justify-center gap-2">
                  <div
                    :class="
                      cn(
                        'absolute -top-3 -right-4 rounded-full bg-discord-green px-2 py-1 text-xs',
                        isMonthly && 'bg-opacity-50 animate-pulse',
                        !isMonthly && 'bg-opacity-95',
                      )
                    "
                  >
                    -16%
                  </div>
                  <SwitchTabs
                    v-model:checked="isMonthly"
                    :first="$t('ultimate.monthly')"
                    :second="$t('ultimate.yearly')"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- purchase button container -->
          <div>
            <ButtonStandout @click="subscribe">
              {{ $t('ultimate.subscribe') }}
            </ButtonStandout>
          </div>
        </div>
      </div>

      <!-- feature comparison section -->
      <div
        class="mt-4 flex w-full flex-col justify-center gap-3 border-t border-border px-4 py-2 md:gap-1"
      >
        <div class="grid grid-cols-7 pt-1">
          <span class="col-span-3 font-semibold md:text-lg">{{
            $t('ultimate.feature')
          }}</span>
          <span class="col-span-2 text-center font-semibold md:text-lg">{{
            $t('ultimate.premium')
          }}</span>
          <span class="col-span-2 text-center font-semibold md:text-lg">{{
            $t('ultimate.free')
          }}</span>
        </div>
        <hr class="my-2 opacity-20" />
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">{{
            $t('ultimate.features.generators')
          }}</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center select-none">{{
            $t('ultimate.maximum', { count: 2 })
          }}</span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">{{
            $t('ultimate.features.interfaces')
          }}</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center select-none">{{
            $t('ultimate.maximum', { count: 1 })
          }}</span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">{{
            $t('ultimate.features.voice_roles')
          }}</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center select-none">{{
            $t('ultimate.maximum', { count: 1 })
          }}</span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">{{
            $t('ultimate.features.templates')
          }}</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center select-none">{{
            $t('ultimate.maximum', { count: 3 })
          }}</span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">{{
            $t('ultimate.features.numbered_names')
          }}</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">{{
            $t('ultimate.features.activity_variables')
          }}</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">{{
            $t('ultimate.features.custom_interfaces')
          }}</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">{{
            $t('ultimate.features.bypass_voting')
          }}</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">{{ $t('ultimate.features.badwords') }}</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">{{
            $t('ultimate.features.waiting_rooms')
          }}</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">{{
            $t('ultimate.features.private_chats')
          }}</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">{{
            $t('ultimate.features.owner_voice_role')
          }}</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">{{
            $t('ultimate.features.creation_message')
          }}</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">{{
            $t('ultimate.features.fallback_generators')
          }}</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
      </div>
    </div>
  </div>
</template>
