<script lang="ts" setup>
import { ChevronDown } from 'lucide-vue-next'
import { UltimatePrices } from '~/constants/UltimatePrices'

const { t } = useI18n()
const { formattedServerCount } = useHomeShowcase()

const params = {
  count: formattedServerCount,
  monthly: `$${UltimatePrices.MONTHLY}`,
  yearly: `$${UltimatePrices.YEARLY}`,
  command: '/setup',
}

const faqs = computed(() =>
  [
    'what',
    'free',
    'setup',
    'owner',
    'voice_roles',
    'permissions',
    'languages',
  ].map((key) => ({
    key,
    question: t(`home.faq.items.${key}.question`),
    answer: t(`home.faq.items.${key}.answer`, params),
  })),
)

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.value.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }),
    },
  ],
}))
</script>

<template>
  <section class="flex w-full max-w-3xl flex-col gap-8 px-4">
    <h2 class="text-center font-display text-3xl tracking-wide md:text-4xl">
      {{ $t('home.faq.title') }}
    </h2>
    <div class="flex flex-col gap-2">
      <details
        v-for="faq in faqs"
        :key="faq.key"
        class="group rounded-md bordered bg-background/80 backdrop-blur"
      >
        <summary
          class="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-medium [&::-webkit-details-marker]:hidden"
        >
          <h3>{{ faq.question }}</h3>
          <ChevronDown
            class="size-5 shrink-0 transition-transform group-open:rotate-180"
          />
        </summary>
        <p class="px-4 pb-4 text-dimmed">{{ faq.answer }}</p>
      </details>
    </div>
  </section>
</template>
