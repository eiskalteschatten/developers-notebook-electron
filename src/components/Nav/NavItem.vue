<template>
    <router-link :to="route"  v-bind:class="getClasses()">
        <div class="label">{{ label }}</div>
    </router-link>
</template>

<script>
    import Vue from "vue";

    export default Vue.extend({
        props: ['label', 'route', 'itemClass', 'active'],
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
