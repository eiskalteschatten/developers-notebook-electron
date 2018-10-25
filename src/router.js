import VueRouter from 'vue-router';
import ViewWrapper from './components/ViewWrapper.vue';

import CategoriesActive from './components/Views/Categories/ActiveCategories.vue';
import CategoriesArchive from './components/Views/Categories/Archive.vue';
import CategoriesSidebar from './components/Views/Categories/Sidebar.vue';
import CategoriesTopRightToolbar from './components/Views/Categories/TopRightToolbar.vue';

import Clients from './components/Views/Clients.vue';
import Projects from './components/Views/Projects.vue';
import Preferences from './components/Views/Preferences.vue';


export const routeTitles = {
    categories: 'Categories',
    newCategory: 'Categories',
    editCategory: 'Categories',
    viewCategory: 'Categories',
    categoryArchive: 'Archived Categories',
    categoryArchiveEdit:  'Archived Categories',
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
        path: '/',
        redirect: { name: defaultRoute.name }
    },
    {
        path: '/categories',
        component: ViewWrapper,
        children: [
            {
                path: '',
                name: 'categories',
                components: { default: CategoriesActive, topRightToolbar: CategoriesTopRightToolbar }
            },
            {
                path: 'new/',
                name: 'newCategory',
                components: { default: CategoriesActive, sidebar: CategoriesSidebar, topRightToolbar: CategoriesTopRightToolbar }
            },
            {
                path: 'edit/:id/',
                name: 'editCategory',
                components: { default: CategoriesActive, sidebar: CategoriesSidebar, topRightToolbar: CategoriesTopRightToolbar },
                props: { default: true, sidebar: true }
            },
            {
                path: 'view/:id/',
                name: 'viewCategory',
                components: { default: CategoriesActive, topRightToolbar: CategoriesTopRightToolbar }
            },
            {
                path: 'archive/',
                name: 'categoryArchive',
                components: { default: CategoriesArchive, topRightToolbar: CategoriesTopRightToolbar }
            },
            {
                path: 'archive/edit/:id/',
                name: 'categoryArchiveEdit',
                components: { default: CategoriesArchive, sidebar: CategoriesSidebar, topRightToolbar: CategoriesTopRightToolbar },
                props: { default: true, sidebar: true }
            },
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
