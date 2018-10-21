'use strict';

const {ipcMain} = require('electron');

const {switchMenu} = require('../lib/preferences/theme');


ipcMain.on('switch-theme', (event, theme) => {
    switchMenu(theme);
});
