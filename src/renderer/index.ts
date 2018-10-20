import Vue from 'vue';
import StructureComponent from './components/Structure.vue';
import loadPreferences from '../common/preferences';

new Vue({
    el: "#vueAnchor",
    template: '<structure-component/>',
    async mounted() {
        const preferences = await loadPreferences();
        localStorage.setItem('preferences', JSON.stringify(preferences));
        localStorage.setItem('theme', preferences.theme);
    },
    components: {
        StructureComponent
    }
});
