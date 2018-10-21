import {ipcRenderer, shell} from 'electron';
import $ from 'jquery';

import setupMenuEvents from './events/menu';

import helper from './events/helper';

export default () => {
    $(document).on('contextmenu', 'input, textarea', function() {
        ipcRenderer.send('show-input-context-menu');
    });

    ipcRenderer.on('switch-theme', (event, theme) => {
        helper.switchCss(`${theme}Css`);
        localStorage.setItem('theme', theme);
    });

    $(document).on('click', '.js-external-link', function(e) {
        e.preventDefault();
        const href = $(this).attr('href');
        shell.openExternal(href);
    });

    setupMenuEvents();
};
