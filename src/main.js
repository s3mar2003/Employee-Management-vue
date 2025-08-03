import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'





const app = createApp(App)
import '@fortawesome/fontawesome-free/css/all.min.css'
app.use(router)
app.mount('#app')
app.use(Notifications)
