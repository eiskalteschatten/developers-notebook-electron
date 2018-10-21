'use strict';

const {ipcRenderer, shell} = require('electron');
const $ = require('jquery');

const helper = require('./events/helper');


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

if (process.platform === 'darwin') {
    require('./events/macos');
}
