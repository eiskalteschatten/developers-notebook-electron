<template>
    <div class="modal">
        <close-button @click="closeModal"></close-button>
        <slot/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {eventBus} from '../app';

    import CloseButton from './Elements/Buttons/CloseButton.vue';

    export default Vue.extend({
        methods: {
            closeModal() {
                eventBus.$emit('toggle-modal');
            }
        },
        components: {
            CloseButton
        }
    });
</script>

<style lang="scss">
    @import '../assets/scss/variables';

    .modal {
        border-radius: 5px;
        display: flex;
        flex: 0 0 auto;
        flex-direction: column;
        left: 50%;
        max-height: 90%;
        overflow: hidden;
        padding: 25px;
        position: absolute;
        top: 150%;
        transform: translate(-50%, -50%);
        transition: all 400ms;
        z-index: 1000;

        &.open {
            top: 50%;
        }

        .modal-title {
            flex: 0 0 auto;
            margin-top: 0;
        }

        .modal-scroll {
            flex: 1 1 auto;
            overflow: auto;
        }

        .modal-header {
            display: block;
            margin-bottom: 25px;
            padding-bottom: 5px;
            width: 100%;
        }
    }

    .dark {
        .modal {
            background: $mainBgDark;
            box-shadow: 0 0 25px $boxShadowColorDark;

            .modal-header {
                border-bottom: 1px solid darken($mainFontColorDark, 70%);
            }
        }
    }

    .light {
        .modal {
            background: $mainBgLight;
            box-shadow: 0 0 25px $boxShadowColorLight;

            .modal-header {
                border-bottom: 1px solid lighten($mainFontColorLight, 80%);
            }
        }
    }
</style>
