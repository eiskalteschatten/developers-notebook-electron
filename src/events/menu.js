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
                router.push({ name: 'editCategory', params: { id } });
                break;
            case 'archive':
                eventBus.$emit('category-archived', id);
                break;
            case 'delete':
                Category.askDelete(id);
                break;
            default:
                router.push({ name: 'categories' });
                break;
        }
    });
};
