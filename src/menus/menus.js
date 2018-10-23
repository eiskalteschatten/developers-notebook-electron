'use strict';

const {BrowserWindow, Menu, ipcMain} = require('electron');

const {switchMenu} = require('../lib/preferences/theme');

const inputCm = require('./config/inputCm');


ipcMain.on('switch-theme', (event, theme) => {
    switchMenu(theme);
});

ipcMain.on('show-input-context-menu', event => {
    const window = BrowserWindow.fromWebContents(event.sender);
    const menu = Menu.buildFromTemplate(inputCm);
    menu.popup(window);
});
