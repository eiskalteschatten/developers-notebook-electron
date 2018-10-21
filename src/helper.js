'use strict';

module.exports = {
    setSavedRoute: route => {
        localStorage.setItem('savedRoute', route);
    },
    getSavedRoute: () => {
        return localStorage.getItem('savedRoute') || '/projects';
    }
};
