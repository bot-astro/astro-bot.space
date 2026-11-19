<template>
  <div
    class="flex flex-col gap-3 rounded-md bordered bg-background-container p-3"
  >
    <span class="font-semibold">{{ props.proposal.summary }}</span>

    <div class="flex flex-col gap-2">
      <div
        v-for="change in props.proposal.diff"
        :key="change.field"
        class="flex flex-col gap-1"
      >
        <span class="text-xs text-foreground-secondary uppercase">{{
          change.field
        }}</span>
        <div class="flex flex-col gap-1 wrap-break-word">
          <span class="rounded bg-red-500/10 px-2 py-1 text-red-300">
            <span class="mr-1 text-xs opacity-70">{{
              $t('ai.proposal.before')
            }}</span>
            {{ change.before ?? $t('common.not_set') }}
          </span>
          <span class="rounded bg-green-500/10 px-2 py-1 text-green-300">
            <span class="mr-1 text-xs opacity-70">{{
              $t('ai.proposal.after')
            }}</span>
            {{ change.after ?? $t('common.not_set') }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="status === 'pending'" class="flex items-center gap-2">
      <Button
        class="bg-[#248046] hover:bg-discord-green"
        :loading="apply_pending"
        @click="
          apply_proposal(
            { guild_id: props.guildId, proposal_id: props.proposal.id },
            {
              onSuccess: () => (status = 'applied'),
              onError: () => (apply_failed = true),
            },
          )
        "
      >
        {{ $t('ai.proposal.approve') }}
      </Button>
      <ButtonText
        :disabled="apply_pending"
        class="hover:underline"
        @click="
          cancel_proposal(
            { guild_id: props.guildId, proposal_id: props.proposal.id },
            { onSuccess: () => (status = 'cancelled') },
          )
        "
      >
        {{ $t('ai.proposal.cancel') }}
      </ButtonText>
    </div>
    <span v-else class="text-foreground-secondary">
      {{
        status === 'applied'
          ? $t('ai.proposal.applied')
          : $t('ai.proposal.cancelled')
      }}
    </span>
    <span v-if="apply_failed && status === 'pending'" class="text-destructive">
      {{ $t('ai.proposal.apply_failed') }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { AIProposal } from '~/types/ai'
import useApplyAiProposalMutation from '~/data/astro/mutations/useApplyAiProposalMutation'
import useCancelAiProposalMutation from '~/data/astro/mutations/useCancelAiProposalMutation'

const props = defineProps<{ guildId: string; proposal: AIProposal }>()

const status = ref<'pending' | 'applied' | 'cancelled'>('pending')
const apply_failed = ref(false)

const { mutate: apply_proposal, isPending: apply_pending } =
  useApplyAiProposalMutation()
const { mutate: cancel_proposal } = useCancelAiProposalMutation()
</script>
