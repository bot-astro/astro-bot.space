<a id="readme-top"></a>

# astro-bot.space

<img src="https://astro-bot.space/img/logo_bg.png" width="40%" align="right">

Astro is the most unique and complete discord bot for temporary voice channels and voice roles!

This repository contains the code for the _frontend_ of the bot.

Other repositories:

- [Backend](https://github.com/bot-astro/astro)
- [Infrastructure](https://github.com/bot-astro/infra) (GitOps) and [cluster](https://github.com/giuliopime/gport) (Terraform)

Resources:

- [Website](https://astro-bot.space)
- [Demo](https://youtu.be/6HF8EwMBanY)

## Table of Contents

- [About The Project](#about-the-project)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Understanding the codebase](#understanding-the-codebase)
  - [Running the application](#running-the-application)
- [Deployment](#deployment)
  - [Prerequisites](#prerequisites-1)
  - [Setup Cloudflare Pages](#setup-cloudflare-pages)
- [Contributing](#contributing)
  - [Top contributors](#top-contributors)
- [License](#license)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

I initially built this bot for my friends Discord, but then it grew way beyond my expectations.  
You can read the story of this project [on my blog post](https://giuliopime.dev/blog/so-i-built-a-discord-bot)!

> [!WARNING]
> I do **not** provide support for self-hosting the bot.

## Development

### Prerequisites

- Node.js v24 or higher
- pnpm
- Typescript
- [Infisical CLI](https://infisical.com/docs/cli/overview), the env variables are there

### Understanding the codebase

> [!NOTE]
> This is a standard Nuxt 4 project, refer to the framework [documentation](https://nuxt.com/docs/getting-started/introduction) for more info.

Design and CSS with [Tailwind](https://nuxt.com/modules/tailwindcss). Inspiration for simple components can be gathered with [shadcn-vue](https://www.shadcn-vue.com/).

Store management with [vue-query](https://tanstack.com/query/latest/docs/framework/vue/overview).

Icon management with [Nuxt Icon](https://nuxt.com/modules/icon). Icons can be browsed on [Icones](https://icones.js.org/).

General utilities from [VueUse](https://vueuse.org/guide/). Most of the general requirements can be solved with this library.

Guides and legal pages are markdown files in `/content`, rendered with [Nuxt Content](https://content.nuxt.com/).  
Translations are in `/i18n` and managed on Crowdin, the guides are english only.

### User authentication

Login is fully managed by the backend (`api-central`): the website redirects to it, and it sets a session cookie once the user is back from Discord.  
Every request to the api is sent with credentials, and also server-side rendering forwards the cookie.  
The flow is explained in the [backend docs](https://github.com/bot-astro/astro/blob/master/docs/authentication.md).

### Running the application

1. Create the development `.env` file  
   It pulls the variables from the `dev` environment of Infisical, each of them is described in `nuxt.config.ts`.
   ```shell
   pnpm run env
   ```
2. Run in dev mode:
   ```shell
   pnpm run dev
   ```
   If you don't have the backend running you can use `pnpm run dev:mock` to get a fake list of guilds.

You will get instructions on how to access the website for local dev in the terminal logs.

## Deployment

> [!WARNING]
> I do **not** provide support for self-hosting the bot.

### Prerequisites

- A fork of this repository
- Cloudflare account

### Setup Cloudflare Pages

This web app should be deployed via nitro on Cloudflare Pages. This allows cheap server-side rendering.  
Follow [this guide](https://nitro.build/deploy/providers/cloudflare#cloudflare-pages) for deployment instructions.  
Settings to use:

- build command: `pnpm install --frozen-lockfile && pnpm build`, output directory `dist`
- `NODE_VERSION=24`, compatibility date `2025-07-15` and the `nodejs_compat` flag
- a D1 database bound as `DB`, Nuxt Content stores the guides in it
- one project per environment, with its own variables

> [!IMPORTANT]
> The environment variables are read at **build time**, so they must be set as build variables of the Pages project.  
> You can see the ones in use and a description of them in `nuxt.config.ts` (`ASTRO_API_BASE_URL`, `CHARGEBEE_SITE`).  
> Set `NUXT_SITE_ENV=production` on the production project, anything else makes the website not indexable by search engines.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

If you have an idea, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/bot-astro/astro/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bot-astro/astro" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->

## License

Distributed under the AGPL-3.0 license. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- [Discord server](https://astro-bot.space/support)
- [hi@astro-bot.space](mailto:hi@astro-bot.space)
- [giuliopime.dev](https://giuliopime.dev)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
