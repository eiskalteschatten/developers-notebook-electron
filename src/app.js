import Vue from 'vue';
import VueRouter from 'vue-router';

import {loadPreferences} from './initialPreferences';
import {setSavedRoute, getSavedRoute} from './helper';

import App from './components/App.vue';
import Projects from './components/Views/Projects.vue';
import Preferences from './components/Views/Preferences.vue';


Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        path: '/projects',
        name: 'projects',
        component: Projects
    },
    {
        path: '/preferences',
        name: 'preferences',
        component: Preferences
    }]
});

new Vue({
    router,
    render: createEle => createEle(App),
    watch:{
        '$route' (to) {
            setSavedRoute(to.fullPath);
        }
    },
    async mounted() {
        this.$router.push(getSavedRoute());

        const preferences = await loadPreferences();
        localStorage.setItem('preferences', JSON.stringify(preferences));
        localStorage.setItem('theme', preferences.theme);
    }
}).$mount('#vueAnchor');
