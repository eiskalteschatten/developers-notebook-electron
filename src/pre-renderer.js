'use strict';

function preRender() {
    try {
        const theme = localStorage.getItem('theme') || 'light';
        const body = document.getElementsByTagName('body')[0];
        body.classList.add(theme);
        body.classList.add(process.platform);
    }
    catch(error) {
        console.error(error);
    }
}

window.onload = preRender;
