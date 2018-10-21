<template>
    <div class="structure-wrapper">
        <div class="title-bar" v-if="showTitlebar"></div>
        <div class="main-structure">
            <nav-component/>
            <div class="view">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    import NavComponent from './Nav.vue';

    export default Vue.extend({
        mounted() {
            const platform = process.platform;

            document.body.className = platform;

            if (platform === 'darwin') {
                this.showTitlebar = true;
            }
        },
        data() {
            return {
                showTitlebar: false
            }
        },
        components: {
            NavComponent
        }
    });
</script>

<style lang="scss">
    $titleBarHeight: 22px;

    .structure-wrapper {
        height: 100%;
        width: 100%;
    }

    .title-bar {
        display: block;
        height: $titleBarHeight;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        -webkit-app-region: drag;
        -webkit-user-select: none;
        z-index: 1000;
    }

    .main-structure {
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;

        .view {
            margin-left: 15px;
        }
    }

    .darwin {
        .main-structure {
            .view {
                margin-left: 15px;
                padding-top: $titleBarHeight;
            }
        }
    }
</style>
