import {
  createApp,
} from 'vue';
import {
  Router,
} from 'vue-router';

import App from './components/App.vue';

export function mount({ router }: { router: Router }): void {
  let app = createApp(App);
  app.use(router);
  app.mount(`#app`);
}
