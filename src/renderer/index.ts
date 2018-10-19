import Vue from 'vue';
import StructureComponent from './components/Structure.vue';

new Vue({
    el: "#vueAnchor",
    template: `
        <div>
            <structure-component/>
        </div>`,
    components: {
        StructureComponent
    }
});
