import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import PageHome from './components/PageHome.vue';

const routes = {
  home: {
    component: PageHome,
    path: `/`,
  },
};

export function makeRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: Object.entries(routes).map(([name, config]) => ({ name, ...config })),
  });
}
