import VueRouter from 'vue-router';

import Categories from './components/Views/Categories.vue';
import Projects from './components/Views/Projects.vue';
import Preferences from './components/Views/Preferences.vue';


export default new VueRouter({
    mode: 'history',
    routes: [{
        path: '/categories',
        name: 'Categories',
        component: Categories
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects
    },
    {
        path: '/preferences',
        name: 'Preferences',
        component: Preferences
    }]
});
