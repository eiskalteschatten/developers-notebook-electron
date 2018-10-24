<template>
    <div class="full-size">
        <toolbar/>
        <div class="full-size flex-row view">
            <router-view class="main-column js-main-column flex-1-1-auto"/>
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
        margin-right: 15px;
        overflow: auto;
        padding-bottom: 15px;
        position: relative;
    }

    .sidebar {
        overflow: auto;
        position: relative;
    }
</style>
