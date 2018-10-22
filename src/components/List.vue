<template>
    <div v-bind:class="{'scrollable': scrollable}" class="list">
        <slot/>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                scrollable: false
            }
        }
    });
</script>

<style lang="scss" scoped>
    .list {
        width: 100%;

        &.scrollable {
            overflow: auto;
            position: relative;
        }
    }
</style>
