<template>
    <div class="toolbar-button">
        <slot/>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss" scoped>
    .toolbar-button {
        cursor: pointer;

        .icon-button {
            display: inline-block;
            vertical-align: text-bottom;
        }

        .label {
            display: inline-block;
            font-size: .8em;
            text-transform: uppercase;
        }
    }
</style>
