import { type VariantProps, cva } from 'class-variance-authority';

export { default as Badge } from './Badge.vue';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-background-button hover:bg-background-button/80',
        discord: 'border-transparent bg-discord',
        ultimate:
          'border-transparent bg-background-ultimate-secondary text-foreground-ultimate-secondary',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
