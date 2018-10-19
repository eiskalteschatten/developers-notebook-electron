import Vue from 'vue';
import StructureComponent from './components/Structure.vue';

new Vue({
    el: "#vueAnchor",
    template: '<structure-component/>',
    components: {
        StructureComponent
    }
});
