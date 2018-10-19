import Vue from 'vue';
import StructureComponent from './components/Structure.vue';

new Vue({
    el: "#vueAnchor",
    template: `
    <div>
        <div>Hello {{name}}!</div>
        Name: <input v-model="name" type="text">
        <structure-component :name="name" :initialEnthusiasm="5" />
    </div>`,
    data: {
        name: "World"
    },
    components: {
        StructureComponent
    }
});
