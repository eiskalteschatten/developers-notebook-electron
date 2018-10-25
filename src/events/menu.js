import {ipcRenderer} from 'electron';
import $ from 'jquery';

import {eventBus} from '../app';
import router from '../router';


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
                router.push({ name: 'categories' });
                break;
            case 'delete':
                router.push({ name: 'categories' });
                break;
            default:
                router.push({ name: 'categories' });
                break;
        }
    });
};
