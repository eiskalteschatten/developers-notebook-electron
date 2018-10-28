import {defaultRoute} from './router';

import Notification from './components/Elements/Notification.vue';


export function setSavedRoute(route) {
    localStorage.setItem('savedRoute', JSON.stringify(route));
}

export function getSavedRoute() {
    try {
        const savedRoute = localStorage.getItem('savedRoute');
        return savedRoute && typeof savedRoute != 'object' ? JSON.parse(savedRoute) : defaultRoute;
    }
    catch(error) {
        console.error(error);
    }
}

export function showNotification(message, type) {
    const notification = new Notification({
        propsData: {
            hasIcon: true,
            type,
            message
        }
    });

    notification.$mount();
    document.body.appendChild(notification.$el);
}
