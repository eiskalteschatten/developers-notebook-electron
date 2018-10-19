import Vue from 'vue';
import StructureComponent from './components/Structure.vue';

new Vue({
    el: "#vueAnchor",
    template: `
    <div>
        <structure-component :name="name" :initialEnthusiasm="5" />
    </div>`,
    components: {
        StructureComponent
    }
});
