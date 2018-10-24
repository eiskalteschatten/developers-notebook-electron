'use strict';

const {defaultRoute} = require('./router');

module.exports = {
    setSavedRoute: route => {
        localStorage.setItem('savedRoute', JSON.stringify(route));
    },
    getSavedRoute: () => {
        try {
            let savedRoute = localStorage.getItem('savedRoute') || defaultRoute;

            if (typeof savedRoute !== Object) {
                savedRoute = JSON.parse(savedRoute);
            }

            return savedRoute;
        }
        catch(error) {
            console.error(error);
        }
    }
};
