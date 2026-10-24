<script lang="ts" setup>
import cn from '~/utils/cn'
import { useUser } from '~/data/astro/query/useUser'
import { toast } from '~/components/ui/toast'

// definePageMeta({
//   middleware: 'auth',
// })

useHead({
  title: 'Ultimate - Astro - Temporary Voice Channels for your Discord!',
  meta: [
    {
      name: 'description',
      content:
        'Take your server to the next level with premium Astro functionalities',
    },
    {
      property: 'og:title',
      content: 'Ultimate - Astro - Temporary Voice Channels for your Discord!',
    },
    {
      property: 'og:description',
      content:
        'Take your server to the next level with premium Astro functionalities',
    },
    { property: 'og:url', content: 'https://astro-bot.space/ultimate' },
  ],
})

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
      description:
        'Something went wrong initiating the checkout, please try again later',
      variant: 'destructive',
    })
  }
}
</script>

<template>
  <div class="mx-12 mt-16 flex w-3/4 flex-col items-center gap-16 md:w-auto">
    <div class="flex flex-col gap-4">
      <span class="text-title text-center">Ultimate server</span>
      <span class="text-subtitle text-center"
        >Take your server to the next level with premium functionalities!</span
      >
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
              <span class="text-center text-xl"
                >per {{ isMonthly ? 'month' : 'year ' }} for
                {{ quantity }} server<span
                  :class="quantity > 1 ? 'visible' : 'invisible'"
                  >s</span
                ></span
              >
            </div>
            <!-- quantity & frequency -->
            <div class="flex flex-col items-center gap-6">
              <div class="flex flex-col gap-1">
                <span class="text-center text-lg font-semibold"
                  >Server quantity</span
                >
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
                <span class="text-center text-lg font-semibold">Billed</span>
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
                    first="Monthly"
                    second="Yearly"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- purchase button container -->
          <div>
            <ButtonStandout @click="subscribe"> Subscribe </ButtonStandout>
          </div>
        </div>
      </div>

      <!-- feature comparison section -->
      <div
        class="mt-4 flex w-full flex-col justify-center gap-3 border-t border-border px-4 py-2 md:gap-1"
      >
        <div class="grid grid-cols-7 pt-1">
          <span class="col-span-3 font-semibold md:text-lg">Feature</span>
          <span class="col-span-2 text-center font-semibold md:text-lg"
            >Premium</span
          >
          <span class="col-span-2 text-center font-semibold md:text-lg"
            >Free</span
          >
        </div>
        <hr class="my-2 opacity-20" />
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Unlimited temporary vc generators</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center select-none">Maximum 2</span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Unlimited interfaces</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center select-none">Maximum 1</span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Unlimited voice roles</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center select-none">Maximum 1</span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Unlimited templates</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center select-none">Maximum 3</span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Numbered voice channel names</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3"
            >User activity variables for channel names</span
          >
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Customisable interfaces</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3"
            >Bypass voting requirements in any server</span
          >
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3"
            >Badwords filter for voice channel names</span
          >
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Waiting rooms</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Private text chats</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Voice role for channel owners</span>
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3"
            >Custom messages at voice channel creation</span
          >
          <span class="col-span-2 text-center"
            ><IconGreenCheck class="size-7"
          /></span>
          <span class="col-span-2 text-center"
            ><IconRedCross class="size-6"
          /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Fallback generators</span>
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
