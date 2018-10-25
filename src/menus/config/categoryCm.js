'use strict';


const template = [
    {
        label: 'Edit Category',
        click: (item, focusedWindow) => {
            focusedWindow.webContents.send('category-event', 'edit');
        }
    },
    {
        label: 'Archive Category',
        click: (item, focusedWindow) => {
            focusedWindow.webContents.send('category-event', 'archive');
        }
    },
    {type: 'separator'},
    {
        label: 'New Category',
        click: (item, focusedWindow) => {
            focusedWindow.webContents.send('category-event', 'new');
        }
    },
    {type: 'separator'},
    {
        label: 'Delete Category',
        click: (item, focusedWindow) => {
            focusedWindow.webContents.send('category-event', 'delete');
        }
    }
];

module.exports = template;
