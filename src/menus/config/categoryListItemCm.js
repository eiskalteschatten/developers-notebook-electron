'use strict';


const template = [
    {
        label: 'Edit Category',
        click: (item, focusedWindow) => {
            focusedWindow.webContents.send('category-event', 'edit');
        }
    },
    {
        label: 'Delete Category',
        click: (item, focusedWindow) => {
            focusedWindow.webContents.send('category-event', 'delete');
        }
    }
];

module.exports = template;
