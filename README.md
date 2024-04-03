# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
pnpm i
```

## Development Server

Start the development server on http://localhost:3000

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment) for more information.

## Modules & Libraries

Design and CSS with [Tailwind](https://nuxt.com/modules/tailwindcss). Inspiration for simple components can be gathered with [Headless UI](https://headlessui.com/).

Store management with [Pinia](https://pinia.vuejs.org/ssr/nuxt.html). It is the superior solution for local state.

Icon management with [Nuxt Icon](https://nuxt.com/modules/icon). Icons can be browsed on [Icones](https://icones.js.org/), specifically the [Fluent UI System Icons](https://icones.js.org/collection/fluent).

General utilities from [VueUse](https://vueuse.org/guide/). Most of the general requirements can be solved with this library.

## Deployment

This web app should be deployed via [nitro on Cloudflare workers](https://nuxt.com/deploy/cloudflare). This allows cheap server-side rendering.

## Project Structure

The standard project structure should be well-known already, as in pages are stored in `/pages`, components in `/components`, etc. More defined and interesting is how the latter is being split into multiple locations.

Any components, that are used as core parts of the web app, such as headers, footers, notification bars or similar, should be stored in the top level of `/components/core`.

Utility components, such as loading animations or similar should be stored in the top level of `/components/util`.

Default components, such as standard interpretations of extended components, like a custom button or color picker should be stored in `/components/default`.

And any page-related components should be stored in `/components/page/PAGE_NAME`.

You should always try and keep components as low-level as possible, as in directory levels, since the naming convention requires component files to be named after the directory path they're located at. As an example, the intro component of the landing page would be name `PageLandingIntro.vue`, as in `/components/page` -> `/landing` -> `PageLandingIntro.vue`.

Such components should always only solve one problem, or integrate one specific behavior, instead of mixing multiple features together. This leads to lots of very small and highly reusable components, and simplifies the continuous development process. As an example, if you're building a message builder, split into as many components as possible, and reuse as much code as possible, e.g. each of the input fields could be using the same underlying component that handles the actual user input, but if required, these input components could be wrapped into other components, that extend the basic functionality.

## Data Management

Data should always be fetched using the in-built composables, such as `useFetch` or `$fetch`, depending on the use case. The fetched data should then be stored in a custom and highly-specific Pinia store.
