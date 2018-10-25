<template>
    <list type="categoryArchive" activeTab="categoryArchive" editRouteName="categoryArchiveEdit"/>
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
