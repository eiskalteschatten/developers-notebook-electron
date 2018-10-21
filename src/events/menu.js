import {ipcRenderer} from 'electron';

import {eventBus} from '../app';
import router from '../router';

export default () => {
    ipcRenderer.on('open-route', (event, route) => {
        router.push(route);
    });

    ipcRenderer.on('open-modal', (event, modal) => {
        eventBus.$emit('toggle-modal', modal);
    });
};
