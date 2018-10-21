import Vue from 'vue';
// import VueRouter from 'vue-router';

import App from './components/App.vue';


// Vue.use(VueRouter);

// const router = new VueRouter({
//     routes: [{
//         path: '/projects',
//         name: 'projects',
//         component: Home
//     },
// // .. others
// });

new Vue({
    // router,
    render: createEle => createEle(App),
}).$mount('#vueAnchor');
