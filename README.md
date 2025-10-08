<a id="readme-top"></a>
# astro-bot.space

<img src="https://astro-bot.space/img/logo_bg.png" width="40%" align="right">

Astro is the most unique and complete discord bot for temporary voice channels and voice roles!

This repository contains the code for the *frontend* of the bot.

Other repositories:
- [Backend](https://github.com/bot-astro/astro)
- [Infrastructure](https://github.com/giuliopime/gport)

Resources:
- [Website](https://astro-bot.space)
- [Demo](https://youtube.com)

## Table of Contents
- [About The Project](#about-the-project)
- [Development](#development)
    - [Prerequisites](#prerequisites)
    - [Understanding the codebase](#understanding-the-codebase)
    - [Running the application](#running-the-application)
- [Deployment](#deployment)
    - [Prerequisites](#prerequisites-1)
    - [Setup Cloudflare worker](#setup-cloudflare-worker)
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
- Node.js v22 or higher
- pnpm (or any other package manager is fine)
- Typescript

### Understanding the codebase
> [!NOTE]
> This is a standard Nuxt3 project, refer to the framework [documentation](https://nuxt.com/docs/3.x/getting-started/introduction) for more info.  

Design and CSS with [Tailwind](https://nuxt.com/modules/tailwindcss). Inspiration for simple components can be gathered with [shadcn-vue](https://www.shadcn-vue.com/).  

Store management with [vue-query](https://tanstack.com/query/latest/docs/framework/vue/overview).  

Icon management with [Nuxt Icon](https://nuxt.com/modules/icon). Icons can be browsed on [Icones](https://icones.js.org/).  

General utilities from [VueUse](https://vueuse.org/guide/). Most of the general requirements can be solved with this library.  

### User authentication and redirect logic
This is a bit tricky, so I made a couple of diagrams to explain the login flow and the server add flow:  

![login flow](https://github.com/bot-astro/astro-bot.space/blob/master/dev-docs/diagrams/login-flow.png?raw=true)  

![server-add flow](https://github.com/bot-astro/astro-bot.space/blob/master/dev-docs/diagrams/server-add-flow.png?raw=true)

### Running the application
1) Create the development `.env` file  
   The `/env` folder contains a `.env.template`.  
   Create a `.env` file in the root directory of the project and copy both the content of `/env/.env.template` inside it.
2) Fill the `.env` file, each variable has a comment explaining what it does.
3) Run in dev mode:
    ```shell
    pnpm run dev
    ```
   
You will get instructions on how to access the website for local dev in the terminal logs.  

## Deployment
> [!WARNING]
> I do **not** provide support for self-hosting the bot.

### Prerequisites
- A fork of this repository
- Cloudflare account

### Setup Cloudflare worker  
This web app should be deployed via nitro on Cloudflare workers. This allows cheap server-side rendering.  
Follow [this guide](https://nitro.build/deploy/providers/cloudflare) for deployment instructions.  

> [!IMPORTANT]
> Remember to provide the worker with the environment variables required.  
> You can see the required env variables and a description of them in `/env/.env.template`.  

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