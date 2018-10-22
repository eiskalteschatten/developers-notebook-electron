import VueRouter from 'vue-router';

import Projects from './components/Views/Projects.vue';
import Preferences from './components/Views/Preferences.vue';


export default new VueRouter({
    routes: [{
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
