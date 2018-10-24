import Vue from 'vue';
import VueRouter from 'vue-router';

import {loadPreferences} from './initialPreferences';
import {setSavedRoute, getSavedRoute} from './helper';
import setupEvents from './events';

import router from './router';
import App from './components/App.vue';

import {routeTitles} from './router';


export const eventBus = new Vue();

Vue.use(VueRouter);

new Vue({
    router,
    render: createElement => createElement(App),
    watch:{
        '$route'(to, from) {
            eventBus.$emit('route-changed', to, from);
            setSavedRoute({
                fullPath: to.fullPath,
                name: to.name
            });
        }
    },
    async mounted() {
        const savedRoute = getSavedRoute();
        this.$router.push(savedRoute.fullPath);

        sessionStorage.setItem('initialViewTitle', routeTitles[savedRoute.name]);

        setupEvents();

        const preferences = await loadPreferences();
        localStorage.setItem('preferences', JSON.stringify(preferences));
        localStorage.setItem('theme', preferences.theme);
    }
}).$mount('#vueAnchor');
