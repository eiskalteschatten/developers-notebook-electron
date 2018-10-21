<template>
    <div class="modal">
        <div class="modal-close" @click="closeModal"></div>
        <slot/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {eventBus} from '../app';

    export default Vue.extend({
        methods: {
            closeModal() {
                eventBus.$emit('toggle-modal');
            }
        }
    });
</script>

<style lang="scss">

</style>
