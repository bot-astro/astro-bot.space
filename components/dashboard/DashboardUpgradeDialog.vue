<template>
  <Dialog v-model:open="open">
    <DialogContent>
      <div class="flex flex-col gap-2">
        <p class="text-xl text-center">
          <IconLoading v-if="user_subscriptions_pending" />
          Upgrade server
        </p>
        <div
          v-if="user_subscriptions && user_subscriptions.subscriptions.filter(s => s.available > 0).length > 0"
          class="text-description"
        >
          <p>Choose a subscription to use to upgrade the server to Ultimate:</p>
          <Popover v-model:open="subscription_menu_open">
            <PopoverTrigger as-child>
              <ButtonSecondary
                role="combobox"
                :aria-expanded="subscription_menu_open"
              >
                {{ selected_subscription_id ? 'Sub with ' + user_subscriptions.subscriptions.find((sub) => sub.subscription_id === selected_subscription_id)?.quantities + ' upgrades' : 'Select subscription' }}
                <IconDropdown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </ButtonSecondary>
            </PopoverTrigger>
            <PopoverContent class="w-[200px] p-0">
              <Command v-model="selected_subscription_id">
                <CommandInput placeholder="Search subscription..." />
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      v-for="sub in user_subscriptions.subscriptions"
                      :key="sub.subscription_id"
                      :value="sub.subscription_id"
                      @select="subscription_menu_open = false"
                    >
                      <Icon name="fluent:checkmark-12-filled" :class="cn('size-4 mr-2', sub.subscription_id === selected_subscription_id ? 'opacity-100' : 'opacity-0')" />
                      {{ sub.available}}/{{ sub.quantities }} available upgrades ({{ sub.subscription_id }})
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div v-else-if="user_subscriptions && user_subscriptions.subscriptions.length > 0" class="text-description">
          <p>You already used all your upgrades. Either downgrade a server or purchase more upgrades!</p>
        </div>
        <div v-else class="text-description">
          <p>You don't have any upgrade available.<br/>Purchase a subscription to upgrade the server to Ultimate and unlock advanced features!</p>
        </div>

        <div class="flex flex-col sm:flex-row justify-end mt-8 gap-2">
          <ButtonStandout @click="emit('onPurchaseOnWebsite')">
            Purchase subscriptions
          </ButtonStandout>
          <Button
            class="w-full sm:w-min"
            :disabled="selected_subscription_id === undefined"
            @click="selected_subscription_id ? emit('onUpgrade', selected_subscription_id) : () => {}"
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
  onPurchaseOnDiscord: [],
  onPurchaseOnWebsite: [],
  onUpgrade: [subscription_id: string]
}>()

const { data: user_subscriptions, error: user_subscriptions_error, isPending: user_subscriptions_pending } = useUserSubscriptions()
const subscription_menu_open = ref(false)
const selected_subscription_id = ref<string | undefined>(undefined)
</script>