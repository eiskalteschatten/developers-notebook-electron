<template>
    <div v-bind:class="getClasses()">
        <div class="label">{{ label }}</div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        props: ['label', 'itemClass', 'active'],
        mounted() {
            console.log(this.active);
        },
        methods: {
            getClasses() {
                return [
                    { 'active': !this.active },
                    this.itemClass,
                    'nav-item',
                    'align-center'
                ]
            }
        }
    });
</script>

<style lang="scss">
    .nav-item {
        cursor: default;
        font-size: .8em;
        height: 50px;
        opacity: .8;

        &:hover {
            opacity: 1;
        }
    }
</style>
