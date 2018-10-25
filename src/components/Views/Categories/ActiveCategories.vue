<template>
    <list type="categories" activeTab="categories" editRouteName="editCategory"/>
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
