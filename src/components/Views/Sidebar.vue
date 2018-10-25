<template>
    <div class="flex-row" id="sidebar" v-bind:style="{ 'width': sidebarWidth }">
        <dragbar dragElementId="sidebar" saveName="sidebarWidth"/>
        <div class="content flex-1-1-auto">
            <router-link :to="{ name: closeRouteName }">
                <close-button/>
            </router-link>
            <slot/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import CloseButton from '../Elements/CloseButton.vue';
    import Dragbar from '../Elements/Dragbar';

    export default Vue.extend({
        props: ['closeRouteName'],
        data() {
            return {
                sidebarWidth: '300px'
            };
        },
        components: {
            CloseButton,
            Dragbar
        },
        mounted() {
            this.sidebarWidth = localStorage.getItem('sidebarWidth');
        }
    });
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/variables';

    .sidebar {
        max-width: 800px;
        min-width: 300px;

        .content {
            padding: 25px 15px 15px 15px;

            .sidebar-title {
                font-size: 1.1em;
                margin-top: 0;
            }
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
