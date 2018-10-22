<template>
    <div>
        <router-link :to="closeRoute">
            <close-button></close-button>
        </router-link>
        <slot/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import CloseButton from '../Elements/CloseButton.vue';

    export default Vue.extend({
        props: ['closeRoute'],
        components: {
            CloseButton
        }
    });
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/variables';

    .sidebar {
        min-width: 300px;
        padding: 15px;

        .sidebar-title {
            font-size: 1.1em;
            margin-top: 0;
        }
    }

    .dark {
        .sidebar {
            background-color: darken($mainBgDark, 2%);
        }
    }

    .light {
        .sidebar {
            background-color: darken($mainBgLight, 2%);
        }
    }
</style>
