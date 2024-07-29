<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
})

const quantity = ref(1)
const isMonthly = ref(true)

const price = computed(() => {
  if (isMonthly.value)
    return (quantity.value * 3.99).toFixed(2)
  else
    return (quantity.value * 39.99).toFixed(2)
})

function increaseQuantity() {
  quantity.value = quantity.value + 1
}

function decreaseQuantity() {
  quantity.value = quantity.value - 1
}
</script>

<template>
  <div class="w-3/4 md:w-auto flex flex-col items-center mt-16 gap-16 mx-12">
    <div class="flex flex-col gap-4">
      <span class="text-title text-center">Ultimate server</span>
      <span class="text-subtitle text-center">Take your server to the next level with premium functionalities!</span>
    </div>

    <div class="flex flex-col bordered rounded-lg bg-gray-900">
      <div class="flex flex-col py-8 px-12">
        <!-- purchase section -->
        <div class="flex flex-col gap-8 items-center">
          <!-- settings container -->
          <div class="flex flex-col md:flex-row gap-8 md:gap-24 justify-evenly w-full">
            <!-- total -->
            <div class="flex flex-col items-center justify-center gap-2">
              <span class="text-center text-6xl font-display font-semibold tracking-wide">${{ price }}</span>
              <span class="text-center text-xl">per {{ isMonthly ? 'month' : 'year ' }} for {{ quantity }} server{{ quantity > 1 ? 's' : '' }}</span>
            </div>
            <!-- quantity & frequency -->
            <div class="flex flex-col items-center gap-6">
              <div class="flex flex-col gap-1">
                <span class="text-center text-lg font-semibold">Server quantity</span>
                <div class="flex items-center justify-center gap-2">
                  <ButtonSecondary
                    class="rounded-lg aspect-square text-center"
                    :disabled="quantity < 2"
                    @click="decreaseQuantity"
                  >
                    <Icon
                      name="fluent:line-horizontal-1-24-filled"
                      class="size-4 m-1"
                    />
                  </ButtonSecondary>
                  <span class="bordered self-stretch flex items-center justify-center px-3 rounded-lg select-none min-w-12 text-center">
                    {{ quantity }}
                  </span>
                  <ButtonSecondary
                    class="rounded-lg aspect-square text-center"
                    @click="increaseQuantity"
                  >
                    <Icon
                      name="fluent:add-12-filled"
                      class="size-4 m-1"
                    />
                  </ButtonSecondary>
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-center text-lg font-semibold">Billed</span>
                <div class="flex items-center justify-center gap-2">
                  <SwitchDoubleText
                    v-model="isMonthly"
                    first="Monthly"
                    second="Yearly"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- purchase button container -->
          <div>
            <ButtonStandout class="text-xl">
              Subscribe
            </ButtonStandout>
          </div>
        </div>
      </div>

      <!-- feature comparison section -->
      <div class="flex flex-col mt-4 border-t border-border w-full px-4 py-2 justify-center gap-3 md:gap-1">
        <div class="grid grid-cols-7 pt-1">
          <span class="col-span-3 font-semibold md:text-lg">Feature</span>
          <span class="col-span-2 text-center font-semibold md:text-lg">Premium</span>
          <span class="col-span-2 text-center font-semibold md:text-lg">Free</span>
        </div>
        <hr class="opacity-20 my-2">
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Unlimited temporary vc generators</span>
          <span class="col-span-2 text-center"><IconGreenCheck class="size-7" /></span>
          <span class="col-span-2 text-center select-none">Maximum 3</span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Unlimited interfaces</span>
          <span class="col-span-2 text-center"><IconGreenCheck class="size-7" /></span>
          <span class="col-span-2 text-center select-none">Maximum 1</span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Unlimited voice roles</span>
          <span class="col-span-2 text-center"><IconGreenCheck class="size-7" /></span>
          <span class="col-span-2 text-center select-none">Maximum 1</span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Unlimited templates</span>
          <span class="col-span-2 text-center"><IconGreenCheck class="size-7" /></span>
          <span class="col-span-2 text-center select-none">Maximum 3</span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Numbered voice channel names</span>
          <span class="col-span-2 text-center"><IconGreenCheck class="size-7" /></span>
          <span class="col-span-2 text-center"><IconRedCross class="size-6" /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Customisable interfaces</span>
          <span class="col-span-2 text-center"><IconGreenCheck class="size-7" /></span>
          <span class="col-span-2 text-center"><IconRedCross class="size-6" /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Badwords filter for voice channel names</span>
          <span class="col-span-2 text-center"><IconGreenCheck class="size-7" /></span>
          <span class="col-span-2 text-center"><IconRedCross class="size-6" /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Waiting rooms</span>
          <span class="col-span-2 text-center"><IconGreenCheck class="size-7" /></span>
          <span class="col-span-2 text-center"><IconRedCross class="size-6" /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Private text chats</span>
          <span class="col-span-2 text-center"><IconGreenCheck class="size-7" /></span>
          <span class="col-span-2 text-center"><IconRedCross class="size-6" /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Voice role for channel owners</span>
          <span class="col-span-2 text-center"><IconGreenCheck class="size-7" /></span>
          <span class="col-span-2 text-center"><IconRedCross class="size-6" /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Custom messages at voice channel creation</span>
          <span class="col-span-2 text-center"><IconGreenCheck class="size-7" /></span>
          <span class="col-span-2 text-center"><IconRedCross class="size-6" /></span>
        </div>
        <div class="grid grid-cols-7 items-center">
          <span class="col-span-3">Fallback generators</span>
          <span class="col-span-2 text-center"><IconGreenCheck class="size-7" /></span>
          <span class="col-span-2 text-center"><IconRedCross class="size-6" /></span>
        </div>
      </div>
    </div>
  </div>
</template>
