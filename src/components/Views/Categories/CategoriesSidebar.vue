<template>
    <Sidebar>
        sidebar here!<br>
        {{ category }}<br>
        id: {{ id }}
    </Sidebar>
</template>

<script>
    import Vue from 'vue';
    import Category from '../../../models/category';

    import Sidebar from '../Sidebar';

    export default Vue.extend({
        props: ['id'],
        data() {
            return {
                category: {}
            }
        },
        components: {
            Sidebar
        },
        methods: {
            async getCategory() {
                this.category = await Category.findById(this.id);
            }
        },
        async mounted() {
            this.getCategory();
        },
        watch: {
            id: async function() {
                this.getCategory();
            }
        }
    });
</script>

<style lang="scss" scoped>

</style>
