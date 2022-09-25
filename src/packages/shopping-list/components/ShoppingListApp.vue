<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue';

import {
  create,
  getList,
  update,
  Item,
} from '../repositories/shopping-list-repository';

import ShoppingList from './ShoppingList.vue';

let items = ref<Item[]>([]);

(async () => {
  items.value = await getList();
})();

let itemsActive = computed(() => items.value.filter(item => item.state === `active`));
let itemsInactive = computed(() => items.value.filter(item => item.state === `inactive`));

let setState = async (itemId: Item[`id`], state: Item[`state`]) => {
  await update(itemId, { state });
  items.value = await getList();
};

let itemNewName = ref(``);
let addItem = async () => {
  await create({ name: itemNewName.value, state: `active` });
  items.value = await getList();
  itemNewName.value = ``;
};
</script>

<template>
  <div>
    <div class="space-y-8">
      <div class="space-y-4">
        <h2
          :class="[
            'text-2xl'
          ]"
        >
          Shopping list
        </h2>
        <ShoppingList
          :items="itemsActive"
          data-qa="active items"
          @toggle-state="setState($event, 'inactive')"
        />
      </div>

      <div class="space-y-4">
        <h2
          :class="[
            'text-2xl'
          ]"
        >
          Recently used
        </h2>
        <ShoppingList
          :items="itemsInactive"
          data-qa="inactive items"
          @toggle-state="setState($event, 'active')"
        />
      </div>

      <div class="space-y-4">
        <h2
          :class="[
            'text-2xl'
          ]"
        >
          Add new item
        </h2>
        <form @submit.prevent="addItem">
          <label for="name">
            Name
          </label>
          <div class="flex gap-2">
            <input
              id="name"
              v-model="itemNewName"
              name="name"
              :class="[
                'flex-grow',
                'border',
                'border-teal-900',
                'rounded',
                'p-2'
              ]"
            >
            <button
              :class="[
                'rounded',
                'px-4',
                'py-3',
                'rounded',
                'bg-teal-600',
                'hover:bg-teal-700',
                'text-white',
                'transition-colors',
              ]"
              @click.prevent="addItem"
            >
              Add item
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
