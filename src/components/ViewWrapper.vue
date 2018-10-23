<template>
    <div class="full-width">
        <toolbar/>
        <div class="full-width flex-row view">
            <router-view class="main-column"/>
            <router-view class="sidebar" name="sidebar"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Toolbar from './Toolbar.vue';

    export default Vue.extend({
        components: {
            Toolbar
        }
    });
</script>

<style lang="scss" scoped>
    .view {
        margin-top: 15px;
    }

    .main-column {
        flex: 1 1 auto;
        margin-right: 15px;
        overflow: auto;
        padding-bottom: 15px;
        position: relative;
    }

    .sidebar {
        flex: 0 0 auto;
        overflow: auto;
        position: relative;
    }
</style>
