<template>
    <div>
        <div class="title-bar" v-bind:class="{'hidden' : hideTitlebar }"></div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        mounted() {
            const platform: string = process.platform;

            document.body.className = platform;

            if (platform === 'darwin') {
                this.hideTitlebar = false;
            }
        },
        data() {
            return {
                hideTitlebar: true
            }
        }
    });
</script>

<style lang="scss">
    $titleBarHeight: 22px;

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
</style>
