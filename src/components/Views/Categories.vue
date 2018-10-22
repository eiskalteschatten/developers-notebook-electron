<template>
    <div>
        <list scrollable="false">
            <list-item />
        </list>
    </div>
</template>

<script>
    import Vue from 'vue';

    import List from '../List.vue';
    import ListItem from '../List/ListItem.vue';

    export default Vue.extend({
        components: {
            List,
            ListItem
        }
    });
</script>

<style lang="scss">

</style>
