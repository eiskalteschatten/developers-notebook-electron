<template>
    <div>
        <button @click="goBack" class="button" v-bind:disabled="disableBack">&lt;</button>
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
                disableBack: true,
                historyPositionIndex: 0
            }
        },
        methods: {
            goBack() {
                router.go(-1);
                this.historyPositionIndex = this.historyPositionIndex - 2; // Subtract 2 to counter the 1 added in the route change event below.
            },
            goForward() {
                router.go(1);
            }
        },
        created() {
            const vm = this;

            eventBus.$on('route-changed', (to, from) => {
                vm.historyPositionIndex++;
                vm.disableBack = vm.historyPositionIndex <= 1;
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
