import { type VariantProps, cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-background-button hover:bg-background-button/80',
        discord:
          'border-transparent bg-discord',
        ultimate:
          'border-transparent text-foreground-ultimate-secondary bg-background-ultimate-secondary',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
