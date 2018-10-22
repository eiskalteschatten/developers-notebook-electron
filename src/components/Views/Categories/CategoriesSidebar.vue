<template>
    <Sidebar>
        sidebar here!
        {{ category }}
    </Sidebar>
</template>

<script>
    import Vue from 'vue';
    import Category from '../../../models/category';

    import Sidebar from '../Sidebar';

    export default Vue.extend({
        data() {
            return {
                id: $router.param.id,
                category: {}
            }
        },
        components: {
            Sidebar
        },
        async mounted() {
            this.category = await Category.findById(this.id);
        }
    });
</script>

<style lang="scss" scoped>

</style>
