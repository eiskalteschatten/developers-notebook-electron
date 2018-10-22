<template>
    <div v-bind:class="{'scrollable': scrollable}">
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
    .scrollable {
        overflow: auto;
        position: relative;
    }
</style>
