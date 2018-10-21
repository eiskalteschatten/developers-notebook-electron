import {ipcRenderer} from 'electron';
import router from '../router';


export default () => {
    ipcRenderer.on('open-preferences', () => {
        router.push('/preferences');
    });
};
