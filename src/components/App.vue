<script setup lang="ts">
import {
  RouterView,
} from 'vue-router';
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <component
      :is="Component"
      :key="route.path"
    />
  </RouterView>
</template>
