<template>
  <div id="particles-js" />
</template>

<script setup lang="ts">
const { default: particlesSettings } = await import('~/assets/particles.json');

onMounted(() => {
  // @ts-expect-error this is registered by a head script declared in the nuxt.config.ts file
  window.particlesJS('particles-js', particlesSettings);
});
</script>

<style scoped>
#particles-js {
  position: fixed;
  background: black;
  top: 0;
  left: 0;
  z-index: -100;
  width: 100vw;
  height: 100%;
}
</style>
