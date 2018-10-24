'use strict';

const {defaultRoute} = require('./router');

module.exports = {
    setSavedRoute: route => {
        localStorage.setItem('savedRoute', JSON.stringify(route));
    },
    getSavedRoute: () => {
        try {
            const savedRoute = localStorage.getItem('savedRoute');
            return typeof savedRoute != 'object' ? JSON.parse(savedRoute) : defaultRoute;
        }
        catch(error) {
            console.error(error);
        }
    }
};
