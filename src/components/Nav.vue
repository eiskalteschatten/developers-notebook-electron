<template>
    <div class="nav">
        <nav-item-component label="Projects" route="/projects" itemClass="projects"/>
        <nav-item-component label="Preferences" route="/preferences" itemClass="preferences"/>
    </div>
</template>

<script>
    import Vue from "vue";
    import NavItemComponent from './Nav/NavItem.vue';

    export default Vue.extend({
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
        width: 70px;
    }

    .darwin {
        .nav {
            padding-top: 22px;
        }
    }
</style>
