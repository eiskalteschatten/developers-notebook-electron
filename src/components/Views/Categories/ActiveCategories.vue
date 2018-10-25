<template>
    <list type="categories" active-tab="categories" edit-route-name="editCategory"/>
</template>

<script>
    import Vue from 'vue';
    import List from './List.vue';

    export default Vue.extend({
        components: {
            List
        }
    });
</script>

<style lang="scss">

</style>
