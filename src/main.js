import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import { createRouter, createWebHistory } from 'vue-router'
import detailsPage from './components/pokeDetails.vue'
import mainPage from './components/mainPage.vue'
import favPage from './components/pokeFav.vue'
import errorPage from './components/errorPage.vue'
import Vuex from 'vuex'

const app = createApp(App)
app.use(Vuex)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', component: mainPage, name: "Home", props: true,
        },
        {
            path: '/details/:id', component: detailsPage, props: true, name: "Details"
        },
        {
            path: '/favorite', component: favPage, props: true, name: "Favorite"
        },
        {
            path: '/:pathMatch(.*)*' , component: errorPage, name: "Error"
        },
    ]
})

app.use(Quasar, quasarUserOptions).use(router).mount('#app')
