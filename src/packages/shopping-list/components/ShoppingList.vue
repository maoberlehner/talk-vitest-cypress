<script setup lang="ts">
import {
  defineEmits,
  defineProps,
} from 'vue';

import {
  Item,
} from '../repositories/shopping-list-repository';

const props = defineProps<{
  items: Item[],
}>();

// Disabled because of console noise.
// const emit = defineEmits<{(event: `toggle-state`, id: Item[`id`]): void }>();
const emit = defineEmits([`toggle-state`]);
</script>

<template>
  <ul class="space-y-2">
    <li
      v-for="item in props.items"
      :key="item.id"
    >
      <button
        :class="[
          'rounded',
          'px-4',
          'py-3',
          'rounded',
          item.state === 'active' ? 'bg-teal-600' : 'bg-gray-500',
          item.state === 'active' ? 'hover:bg-teal-700' : 'hover:bg-gray-600',
          'text-white',
          'text-left',
          'w-full',
          'transition-colors',
        ]"
        @click="emit(`toggle-state`, item.id)"
      >
        {{ item.name }}
      </button>
    </li>
  </ul>
</template>
