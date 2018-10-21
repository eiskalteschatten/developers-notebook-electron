import Vue from 'vue';
import VueRouter from 'vue-router';

import {loadPreferences} from './initialPreferences';
import {setSavedRoute, getSavedRoute} from './helper';
import setupEvents from './events';

import router from './router';
import App from './components/App.vue';


export const eventBus = new Vue();

Vue.use(VueRouter);

new Vue({
    router,
    render: createElement => createElement(App),
    watch:{
        '$route' (to) {
            setSavedRoute(to.fullPath);
        }
    },
    async mounted() {
        this.$router.push(getSavedRoute());
        setupEvents();

        const preferences = await loadPreferences();
        localStorage.setItem('preferences', JSON.stringify(preferences));
        localStorage.setItem('theme', preferences.theme);
    }
}).$mount('#vueAnchor');
