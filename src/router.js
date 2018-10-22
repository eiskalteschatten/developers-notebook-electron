import VueRouter from 'vue-router';
import ViewWrapper from './components/Views/ViewWrapper.vue';

import CategoriesList from './components/Views/Categories/CategoriesList.vue';
import CategoriesSidebar from './components/Views/Categories/CategoriesSidebar.vue';

import Clients from './components/Views/Clients.vue';
import Projects from './components/Views/Projects.vue';
import Preferences from './components/Views/Preferences.vue';


export const routeTitles = {
    categories: 'Categories',
    editCategory: 'Categories',
    viewCategory: 'Categories',
    clients: 'Clients',
    projects: 'Projects',
    preferences: 'Preferences'
};

export default new VueRouter({
    routes: [{
        path: '/categories',
        component: ViewWrapper,
        children: [
            {
                path: '',
                name: 'categories',
                component: CategoriesList
            },
            {
                path: 'edit/:id/',
                name: 'editCategory',
                components: { default: CategoriesList, sidebar: CategoriesSidebar },
                props: { default: false, sidebar: true }
            },
            {
                path: 'view/:id/',
                name: 'viewCategory',
                component: CategoriesList
            },
        ]
    },
    {
        path: '/clients',
        name: 'clients',
        component: Clients
    },
    {
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
