'use strict';

const {ipcMain, dialog, BrowserWindow} = require('electron');

/*
*    options: {
*        type, message, detail, buttons, eventNames
*    }
*/
ipcMain.on('show-dialog', (event, options) => {
    dialog.showMessageBox({
        message: options.message,
        detail: options.detail,
        buttons: options.buttons,
        type: options.type,
        defaultId: 1,
        cancelId: 0
    }, response => {
        if (response === 1) {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            for (const eventName of options.eventNames) {
                focusedWindow.send(eventName);
            }
        }
    });
});
