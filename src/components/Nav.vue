<template>
    <div class="nav">
        <div class="top-nav">
            <nav-item-component label="Categories" route="/categories" itemClass="categories"/>
            <nav-item-component label="Clients" route="/clients" itemClass="clients"/>
            <!-- <nav-item-component label="Projects" route="/projects" itemClass="projects"/> -->
        </div>
        <div class="bottom-nav">
            <nav-item-component label="Preferences" route="/preferences" itemClass="preferences"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
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

        .top-nav {
            flex: 1 0 auto;
        }
    }

    .darwin {
        .nav {
            padding-top: 22px;
        }
    }
</style>
