import {ipcRenderer} from 'electron';
import router from '../router';


export default () => {
    ipcRenderer.on('open-route', (event, route) => {
        router.push(route);
    });
};
