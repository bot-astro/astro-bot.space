<template>
  <Icon name="fluent:question-circle-32-regular" :class="props.class" />
</template>

<script setup lang="ts">
import type {HTMLAttributes} from "vue";

const props = defineProps<{class?: HTMLAttributes['class']}>()
</script>