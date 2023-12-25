<template>
  <div class="wrapper" :style="`height: ${size}px; width: ${size}px;`">
    <div class="inner" :style="`width: ${size}px`">
      <div v-for="i in 2" :class="`part-wrapper ${i === 1 ? 'left' : 'right'}`">
        <svg class="part-inner" :viewBox="viewBox">
          <circle
            fill="none"
            :class="`path stroke-current ${color}`"
            :cx="centerPoint"
            :cy="centerPoint"
            :r="circleRadius"
            :stroke-width="strokeWidth"
            :stroke-dasharray="full"
            :stroke-dashoffset="half"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { size, color } = withDefaults(
  defineProps<{
    size: number;
    color: string;
  }>(),
  {
    size: 48,
    color: "text-black",
  },
);

const viewBox = `0 0 ${size} ${size}`;
const centerPoint = size / 2;
const circleRadius = (size / 2) * 0.75;
const strokeWidth = circleRadius * 0.25;

const full = 2 * Math.PI * circleRadius;
const half = full / 2;
</script>

<style scoped>
.wrapper {
  position: relative;
  animation: wrapper-spin 1568.2352941176ms linear infinite;
}

.inner {
  position: absolute;
  height: 100%;
  width: 100%;
  animation: inner-spin 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.part-wrapper {
  display: inline-flex;
  position: relative;
  height: 100%;
  width: 50%;
  overflow: hidden;
}

.part-inner {
  width: 200%;
  height: 100%;
  position: absolute;
}

.left .part-inner {
  animation: left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.right .part-inner {
  animation: right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
  left: -100%;
}

@keyframes wrapper-spin {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes inner-spin {
  12.5% {
    transform: rotate(135deg);
  }
  25% {
    transform: rotate(270deg);
  }
  37.5% {
    transform: rotate(405deg);
  }
  50% {
    transform: rotate(540deg);
  }
  62.5% {
    transform: rotate(675deg);
  }
  75% {
    transform: rotate(810deg);
  }
  87.5% {
    transform: rotate(945deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}

@keyframes left-spin {
  0% {
    transform: rotate(265deg);
  }
  50% {
    transform: rotate(130deg);
  }
  100% {
    transform: rotate(265deg);
  }
}

@keyframes right-spin {
  0% {
    transform: rotate(-265deg);
  }
  50% {
    transform: rotate(-130deg);
  }
  100% {
    transform: rotate(-265deg);
  }
}
</style>
