import {ipcRenderer} from 'electron';
import $ from 'jquery';

import {eventBus} from '../app';
import router from '../router';

import Category from '../models/category';


export default () => {
    ipcRenderer.on('open-route', (event, route) => {
        router.push(route);
    });

    ipcRenderer.on('open-modal', (event, modal) => {
        eventBus.$emit('toggle-modal', modal);
    });

    ipcRenderer.on('category-event', (event, command) => {
        const id = $('.js-category-list-item:hover').data('id');

        switch(command) {
            case 'new':
                router.push({ name: 'newCategory' });
                break;
            case 'edit':
                const currentRouteName = sessionStorage.getItem('currentRouteName');
                const routeToPush = currentRouteName.indexOf('categoryArchive') > -1 ? 'categoryArchiveEdit' : 'editCategory';
                router.push({ name: routeToPush, params: { id } });
                break;
            case 'archive':
                Category.askArchive(id, false);
                break;
            case 'unarchive':
                Category.askUnarchive(id, false);
                break;
            case 'delete':
                Category.askDelete(id, false);
                break;
            default:
                router.push({ name: 'categories' });
                break;
        }
    });
};
