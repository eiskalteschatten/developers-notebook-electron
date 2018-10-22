import VueRouter from 'vue-router';

import Categories from './components/Views/Categories.vue';
import Clients from './components/Views/Clients.vue';
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
        path: '/clients',
        name: 'Clients',
        component: Clients
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
