<template>
    <router-link :to="route" v-bind:class="getClasses()" :title="label" />
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        props: ['label', 'route', 'itemClass'],
        methods: {
            getClasses() {
                return [
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
        background-position: center;
        background-repeat: no-repeat;
        background-size: 35px;
        color: #ffffff;
        cursor: default;
        display: block;
        font-size: .8em;
        height: 55px;
        opacity: .7;
        text-decoration: none;

        &:hover, &.router-link-active {
            opacity: 1;
        }

        &.categories {
            background-image: url(../../assets/images/categories-icon.svg);
        }

        &.clients {
            background-image: url(../../assets/images/clients-icon.svg);
        }

        &.projects {
            background-image: url(../../assets/images/projects-icon.svg);
        }

        &.preferences {
            background-image: url(../../assets/images/preferences-icon.svg);
        }
    }
</style>
