<template>
    <div class="nav">
        <nav-item-component label="Home" itemClass="home" v-bind:active="active === 0"/>
        <nav-item-component label="Projects" itemClass="projects" v-bind:active="active === 0"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import NavItemComponent from './Nav/NavItem.vue';

    export default Vue.extend({
        data() {
            return {
                active: 0
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
