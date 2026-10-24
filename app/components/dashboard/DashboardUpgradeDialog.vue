<template>
  <Dialog v-model:open="open">
    <DialogContent>
      <div class="flex flex-col gap-2">
        <p class="text-center text-xl">
          <IconLoading v-if="user_subscriptions_pending" />
          Upgrade server
        </p>
        <div
          v-if="
            user_subscriptions &&
            user_subscriptions.subscriptions.filter((s) => s.available > 0)
              .length > 0
          "
        >
          <p class="text-description mb-2">
            Choose a subscription to use to upgrade the server to Ultimate:
          </p>
          <RadioGroup
            v-model="selected_subscription_id"
            class="flex flex-col gap-2 overflow-y-auto"
          >
            <div
              v-for="sub in user_subscriptions.subscriptions"
              :key="sub.subscription_id"
              class="flex items-center gap-2"
            >
              <RadioGroupItem
                :id="sub.subscription_id"
                :value="sub.subscription_id"
              />
              <Label :for="sub.subscription_id">
                {{ sub.annual ? 'Annual' : 'Monthly' }} sub with
                {{ sub.available }}/{{ sub.quantities }} available upgrades
                <span class="text-foreground-secondary">
                  ({{ sub.subscription_id }})</span
                >
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div
          v-else-if="
            user_subscriptions && user_subscriptions.subscriptions.length > 0
          "
          class="text-description"
        >
          <p>
            You already used all your upgrades. Either downgrade a server or
            purchase more upgrades!
          </p>
        </div>
        <div v-else class="text-description">
          <p>
            You don't have any upgrade available.<br />Purchase a subscription
            to upgrade the server to Ultimate and unlock advanced features!
          </p>
        </div>

        <div class="mt-8 flex flex-col justify-end gap-2 sm:flex-row">
          <ButtonStandout @click="emit('onPurchaseOnWebsite')">
            Purchase subscriptions
          </ButtonStandout>
          <Button
            class="w-full sm:w-min"
            :disabled="selected_subscription_id === undefined"
            @click="
              selected_subscription_id
                ? emit('onUpgrade', selected_subscription_id)
                : () => {}
            "
          >
            Upgrade
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
const open = defineModel<boolean>()

const emit = defineEmits<{
  onPurchaseOnDiscord: []
  onPurchaseOnWebsite: []
  onUpgrade: [subscription_id: string]
}>()

const { data: user_subscriptions, isPending: user_subscriptions_pending } =
  useUserSubscriptions()
const selected_subscription_id = ref<string | undefined>(undefined)
</script>
