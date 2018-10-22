<template>
    <div>
        <button @click="goBack" class="button" v-bind:disabled="canGoBack">&lt;</button>
        <button @click="goForward" class="button">&gt;</button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {eventBus} from '../../app';
    import router from '../../router';

    export default Vue.extend({
        data() {
            return {
                canGoBack: false
            }
        },
        methods: {
            goBack() {
                router.go(-1);
            },
            goForward() {
                router.go(1);
            }
        },
        created() {
            const vm = this;

            eventBus.$on('route-changed', (to, from) => {
                vm.canGoBack = ! window.history.length > 2;
            });
        }
    });
</script>

<style lang="scss" scoped>
    .button {
        font-size: 1.4em;
        outline: none;
        padding: 1px 8px;
    }
</style>
