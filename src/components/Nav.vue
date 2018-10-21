<template>
    <div class="nav">
        <nav-item-component label="Projects" route="/projects" itemClass="projects" v-bind:active="active === 'projects'"/>
        <nav-item-component label="Preferences" route="/preferences" itemClass="preferences" v-bind:active="active === 'preferences'"/>
    </div>
</template>

<script>
    import Vue from "vue";
    import NavItemComponent from './Nav/NavItem.vue';

    export default Vue.extend({
        data() {
            return {
                active: 'projects'
            }
        },
        components: {
            NavItemComponent
        }
    });
</script>

<style lang="scss">
    .nav {
        background: #000000;
        display: flex;
        flex: 0 1 auto;
        flex-direction: column;
        width: 75px;
    }
</style>
