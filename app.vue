<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
  <VueQueryDevtools />
  <CoreParticles />
<!--  <NuxtParticles-->
<!--    id="particles"-->
<!--    :options="particlesOptions"-->
<!--  />-->
</template>

<script setup lang="ts">
import {VueQueryDevtools} from "@tanstack/vue-query-devtools";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}Astro - Temporary Voice Channels for your Discord!` : 'Astro - Temporary Voice Channels for your Discord!';
  },
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ],
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'keywords',
      content: 'astro discord bot, astro discord, temporary voice channels, temporary vc, discord, discord Bot, astro, voice Channels, astro commands, astro documentation, astro premium, astro team, astro ultimate'
    },
    {
      name: 'robots',
      content: 'noodp,noydir'
    },
    {
      key: 'og:type',
      property: 'og:type',
      content: 'website'
    },
    {
      key: 'og:image',
      property: 'og:image',
      content: 'https://astro-bot.space/img/logo.png'
    },
    {
      name: 'theme-color',
      content: '#BB4FEE'
    },
    {
      name: 'author',
      content: 'Giulio Pimenoff Verdolin'
    },
  ],
})

const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 100
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false
      }
    },
    size: {
      value: 1,
      random: true,
      anim: {
        enable: false,
        speed: 4,
        size_min: 5,
        sync: false
      }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 600
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
        mode: "bubble"
      },
      onclick: {
        enable: false,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 83.91608391608392,
        size: 5,
        duration: 2,
        opacity: 0,
        speed: 3
      },
      repulse: {
        distance: 400,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
}
</script>