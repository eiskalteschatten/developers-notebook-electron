import VueRouter from 'vue-router';
import ViewWrapper from './components/ViewWrapper.vue';

import CategoriesList from './components/Views/Categories/List.vue';
import CategoriesSidebar from './components/Views/Categories/Sidebar.vue';
import CategoriesTopRightToolbar from './components/Views/Categories/TopRightToolbar.vue';

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

export const defaultRoute = {
    fullPath: '/categories',
    name: 'categories'
};

export default new VueRouter({
    routes: [{
        path: '/categories',
        component: ViewWrapper,
        children: [
            {
                path: '',
                name: 'categories',
                components: { default: CategoriesList, topRightToolbar: CategoriesTopRightToolbar },
            },
            {
                path: 'edit/:id/',
                name: 'editCategory',
                components: { default: CategoriesList, sidebar: CategoriesSidebar, topRightToolbar: CategoriesTopRightToolbar },
                props: { default: true, sidebar: true }
            },
            {
                path: 'view/:id/',
                name: 'viewCategory',
                components: { default: CategoriesList, topRightToolbar: CategoriesTopRightToolbar },
            }
        ]
    },
    {
        path: '/clients',
        component: ViewWrapper,
        children: [
            {
                path: '',
                name: 'clients',
                component: Clients
            },
        ]
    },
    {
        path: '/projects',
        component: ViewWrapper,
        children: [
            {
                path: '',
                name: 'projects',
                component: Projects
            }
        ]
    },
    {
        path: '/preferences',
        component: ViewWrapper,
        children: [
            {
                path: '',
                name: 'preferences',
                component: Preferences
            }
        ]
    }]
});
