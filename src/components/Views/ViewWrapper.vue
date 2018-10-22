<template>
    <div class="full-width flex-row">
        <router-view class="main-column"></router-view>
        <router-view class="sidebar" name="sidebar"></router-view>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss" scoped>
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
