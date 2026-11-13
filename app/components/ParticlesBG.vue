<template>
  <div id="particles-js" />
</template>

<script setup lang="ts">
const { default: particlesSettings } = await import('~/assets/particles.json')

onMounted(() => {
  // the cdn script can be blocked or fail to load, the background is purely decorative
  window.particlesJS?.('particles-js', particlesSettings)
})
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
