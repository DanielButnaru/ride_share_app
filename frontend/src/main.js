import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'

import VueGoogleMaps from '@fawmi/vue-google-maps'


import './assets/main.css'
import './assets/style/style.css'

const app = createApp(App)

app.use(createPinia());
app.use(router)



app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCAqdwRPpTtDGc6lWZKlSO0EPgkAKRo-8o',
        libraries: 'places'
    }
})

app.use(PrimeVue, {
    unstyled: true
});

app.mount('#app')